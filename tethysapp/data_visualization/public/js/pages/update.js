var dataset_table = null;

// Loading overlay
function showLoading() {
    $('#loading').show();
}

function hideLoading() {
    $('#loading').hide();
}

// Document Ready
$(document).ready(function () {
    // Hiển thị và ẩn overlay cho tất cả các yêu cầu AJAX
    $(document).ajaxStart(showLoading).ajaxStop(hideLoading);

    // Khởi tạo dropdown và load dữ liệu ban đầu
    initFacilityTypeDropdown();
    loadFacilitiesByType();
});

// Khởi tạo dropdown loại cơ sở
function initFacilityTypeDropdown() {
    $('#facility-type-select').on('change', function () {
        const selectedType = $(this).val();
        loadFacilitiesByType(selectedType !== 'all' ? selectedType : null);
    });

    $('#search-result-input').on('input', function () {
        if (dataset_table) {
            dataset_table.search(this.value).draw();
        }
    });
}

// Load dữ liệu theo type
function loadFacilitiesByType(type = null) {
    let apiUrl = type ? `http://127.0.0.1:5000/api/data/facilities/${type}`
        : 'http://127.0.0.1:5000/api/data/facilities';

    $.ajax({
        url: apiUrl,
        type: 'GET',
        success: function (res) {
            let data = res.data || []; // Giả định API trả về {data: [...]}
            fillDataToTable(data);
        },
        error: function (error) {
            console.error('Error fetching data', error);
            alert('Không thể tải dữ liệu, vui lòng thử lại');
        }
    });
}

// Điền dữ liệu vào DataTable
function fillDataToTable(data) {
    // Xóa bảng cũ nếu tồn tại
    if (dataset_table !== null) {
        dataset_table.clear().destroy();
        $('#result-table tbody').off();
    }

    // Khởi tạo DataTable mới
    dataset_table = $('#result-table').DataTable({
        data: data,
        language: {
            zeroRecords: 'Không có kết quả tìm kiếm phù hợp',
            lengthMenu: 'Hiển thị _MENU_ cơ sở/trang',
            info: 'Đang xem _START_ đến _END_ trong tổng _TOTAL_ cơ sở',
            search: 'Tìm kiếm:',
        },
        dom: '<"top"i>rt<"bottom"flp><"clear">',
        pageLength: 10,
        order: [[1, 'asc']],
        columns: [
            {
                title: 'STT',
                width: '50px',
                render: (data, type, full, meta) => meta.row + 1,
            },
            {
                data: 'name',
                title: 'Tên cơ sở y tế',
            },
            {
                data: 'type',
                title: 'Loại hình',
                width: '160px',
            },
            {
                data: 'address',
                title: 'Địa chỉ',
                width: '250px',
                defaultContent: 'Không có thông tin',
            },
            {
                data: 'healthcare_speciality',
                title: 'Chuyên khoa',
                width: '120px',
            },
            {
                data: 'opening_hours',
                title: 'Giờ mở cửa',
                width: '160px',
                defaultContent: 'Không rõ',
            },
            {
                data: 'phone',
                title: 'SĐT',
                width: '140px',
                defaultContent: 'Không rõ',
            },
            {
                data: 'website',
                title: 'Website',
                width: '200px',
                render: function (data) {
                    return data ? `<a href="${data}" target="_blank">${data}</a>` : 'Không có';
                }
            },
            {
                data: 'osm_id',
                title: 'Thao tác',
                width: '240px',
                className: 'text-center',
                orderable: false,
                render: (data, type, row) => `
                    <div class="result-btn" style="text-align: center;">
                        <button class="btn btn-sm btn-primary btn-edit" data-id="${data}">Chỉnh sửa</button>
                        <button class="btn btn-outline-danger delete-result-btn btn-delete" data-id="${data}">Xóa</button>
                    </div>
                `,
            }
        ]
    });
}

// Xử lý sự kiện chỉnh sửa
$('#result-table').on('click', '.btn-edit', function () {
    const rowData = dataset_table.row($(this).closest('tr')).data();
    fillEditModal(rowData);
    new bootstrap.Modal($('#editFacilityModal')).show();
});

function fillEditModal(data) {
    $('#edit_osm_id').val(data.osm_id);
    $('#edit_name').val(data.name || '');
    $('#edit_type').val(data.type || '');
    $('#edit_speciality').val(data.healthcare_speciality || 'chung');
    $('#edit_address').val(data.address || '');
    $('#edit_phone').val(data.phone || '');
    $('#edit_opening_hours').val(data.opening_hours || '');
    $('#edit_website').val(data.website || '');
    $('#edit_lat').val(data.lat || '');
    $('#edit_lon').val(data.lon || '');
}

// Xử lý submit form chỉnh sửa
$('#editFacilityForm').on('submit', function (e) {
    e.preventDefault();
    const payload = {
        id: $('#edit_osm_id').val(),
        name: $('#edit_name').val(),
        type: $('#edit_type').val(),
        speciality: $('#edit_speciality').val(),
        address: $('#edit_address').val(),
        phone: $('#edit_phone').val(),
        opening_hours: $('#edit_opening_hours').val(),
        website: $('#edit_website').val(),
        lat: parseFloat($('#edit_lat').val()) || null,
        lon: parseFloat($('#edit_lon').val()) || null
    };

    $.ajax({
        url: `http://127.0.0.1:5000/api/data/facility/update`,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(payload),
        headers: { 'X-CSRFToken': getCSRFToken() },
        success: function () {
            alert('Cập nhật thành công');
            $('#editFacilityModal').modal('hide');
            loadFacilitiesByType($('#facility-type-select').val() || null);
        },
        error: function (xhr) {
            alert('Lỗi khi cập nhật: ' + (xhr.responseJSON?.error || xhr.statusText));
        }
    });
});

// Xử lý xóa
$('#result-table').on('click', '.btn-delete', function () {
    if (!confirm('Xác nhận xóa cơ sở y tế này?')) return;

    const osmId = $(this).data('id');
    const $row = $(this).closest('tr');

    $.ajax({
        url: `http://127.0.0.1:5000/api/data/facility/delete/${osmId}`,
        type: 'DELETE',
        headers: { 'X-CSRFToken': getCSRFToken() },
        success: function () {
            dataset_table.row($row).remove().draw();
            alert('Xóa thành công');
        },
        error: function () {
            alert('Không thể xóa, vui lòng thử lại');
        }
    });
});

// Lấy CSRF Token
function getCSRFToken() {
    return document.querySelector('meta[name="csrf-token"]').getAttribute('content');
}