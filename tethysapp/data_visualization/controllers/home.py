from django.shortcuts import render
from tethys_sdk.routing import controller

@controller(url='/')
def home(request):
    context = {}

    return render(request, 'data_visualization/pages/home.html', context)