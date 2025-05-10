from django.shortcuts import render
from tethys_sdk.routing import controller

@controller(url='/dashboard')
def dashboard(request):
    context = {}
    return render(request, 'data_visualization/pages/dashboard.html', context)