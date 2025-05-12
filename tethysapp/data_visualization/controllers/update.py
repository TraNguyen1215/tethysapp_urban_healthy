from django.shortcuts import render
from tethys_sdk.routing import controller

@controller(url='/update')
def update(request):
    context = {}
    return render(request, 'data_visualization/pages/update.html', context)