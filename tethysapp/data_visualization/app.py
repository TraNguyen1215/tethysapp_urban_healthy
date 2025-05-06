from tethys_sdk.base import TethysAppBase


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