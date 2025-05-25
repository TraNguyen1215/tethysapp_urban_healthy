from tethys_sdk.base import TethysAppBase
from tethys_sdk.app_settings import SpatialDatasetServiceSetting



class DataVisualization(TethysAppBase):
    """
    Tethys app class for Data Visualization.
    """

    name = 'WebGIS Y Tế Đô Thị'
    description = ''
    package = 'data_visualization'
    index = 'home'
    icon = f'{package}/images/icon.gif'
    root_url = 'data-visualization'
    color = '#172852'
    tags = ''
    enable_feedback = False
    feedback_emails = []
    
    def spatial_dataset_service_settings(self):
        """
        Example spatial_dataset_service_settings method.
        """
        sds_settings = (
            SpatialDatasetServiceSetting(
                name='main_geoserver',
                description='spatial dataset service for app to use',
                engine=SpatialDatasetServiceSetting.GEOSERVER,
                required=True,
            ),
        )

        return sds_settings