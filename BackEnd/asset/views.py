from django.contrib.auth.models import User
from django.http import JsonResponse

from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import JSONParser
from rest_framework import status

from .models import Asset, AssetHistory, STATUS_CHOICE, TYPE_CHOICE

import datetime

import json

# import the logging library
import logging
# Get an instance of a logger
logger = logging.getLogger(__name__)

PAGE_COUNT = 10

class AssetCreateView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [JSONParser]

    def get(self, request, *args, **kwargs):
        if (request.user.profile.canManageAsset is False):
            return JsonResponse({'detail': 'Permission Denied'}, status=status.HTTP_406_NOT_ACCEPTABLE)

        return JsonResponse({
                'status': json.dumps(STATUS_CHOICE),
                'type': json.dumps(TYPE_CHOICE),
            }, status = status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        if (request.user.profile.canManageAsset is False):
            return JsonResponse({'detail': 'Permission Denied'}, status=status.HTTP_406_NOT_ACCEPTABLE)

        user = request.user
        item = Asset()
        item.name = request.data['name']
        item.model = request.data['model']
        item.serial = request.data['serial']
        item.purchaseDate = datetime.datetime.fromtimestamp(int(request.data['purchaseDate']))
        item.warranty = int(request.data['warranty'])
        item.type = int(request.data['type'])
        item.status = int(request.data['status'])
        item.description = request.data['description']
        item.user = user
        item.save()

        # saving history
        history = AssetHistory()
        history.fromUser = self.request.user
        history.toUser = self.request.user
        history.asset = item
        history.save()
        return JsonResponse({'detail': 'Asset created'}, status=status.HTTP_200_OK)

class AssetListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        if (request.user.profile.canManageAsset is False):
            return JsonResponse({'detail': 'Permission Denied'}, status=status.HTTP_406_NOT_ACCEPTABLE)

        assetList = Asset.objects.all()

        # pagination
        page = int(request.GET.get('page', 1))
        listCount = len(assetList)
        assetList = assetList[(page - 1) * PAGE_COUNT : ((page - 1) * PAGE_COUNT) + PAGE_COUNT]
        # json
        assetJsons = [ob.as_json() for ob in assetList]
        return JsonResponse({
                'status': json.dumps(STATUS_CHOICE),
                'type': json.dumps(TYPE_CHOICE),
                'count': listCount,
                'asset_list': json.dumps(assetJsons),
            }, status=status.HTTP_200_OK)

class MyAssetListView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [JSONParser]

    def get(self, request, *args, **kwargs):
        assetList = Asset.objects.filter(user=self.request.user)
        # calculating warranty last date
        for i in assetList:
            i.purchaseDate = i.purchaseDate + datetime.timedelta(days=i.warranty)

        # pagination
        page = int(request.GET.get('page', 1))
        listCount = len(assetList)
        assetList = assetList[(page - 1) * PAGE_COUNT : ((page - 1) * PAGE_COUNT) + PAGE_COUNT]
        # json
        assetJsons = [ob.as_json() for ob in assetList]

        # getting user list for dropdown
        users = User.objects.all()
        profiles = []
        for user in users:
            profiles.append(user.profile)
        profileJsons = [ob.as_json() for ob in profiles]

        return JsonResponse({
                'asset_list': json.dumps(assetJsons),
                'user_list': json.dumps(profileJsons),
                'count': listCount,
            }, status = status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        if (request.data['pk']):
            asset = Asset.objects.get(pk=request.data['pk'])
            # logger.warning('assignee: {}'.format(request.data['pk']))
            if (request.data['assignee'] and asset.next_user is None):
                asset.next_user = User.objects.get(pk=request.data['assignee'])
                asset.save()
            else:
                return JsonResponse({'detail': 'Asset is already assigned to someone else'}, status=status.HTTP_406_NOT_ACCEPTABLE)
            return JsonResponse({'detail': 'Asset assigned'}, status=status.HTTP_200_OK)
        else:
            return JsonResponse({'detail': 'Asset assign failed'}, status=status.HTTP_406_NOT_ACCEPTABLE)

class MyPendingAssetListView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [JSONParser]

    def get(self, request, *args, **kwargs):
        assetList = Asset.objects.filter(next_user=self.request.user)
        # calculating warranty last date
        for i in assetList:
            i.purchaseDate = i.purchaseDate + datetime.timedelta(days=i.warranty)

        # pagination
        page = int(request.GET.get('page', 1))
        listCount = len(assetList)
        assetList = assetList[(page - 1) * PAGE_COUNT : ((page - 1) * PAGE_COUNT) + PAGE_COUNT]
        # json
        assetJsons = [ob.as_json() for ob in assetList]

        return JsonResponse({'asset_list': json.dumps(assetJsons), 'count': listCount}, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        if (request.data['pk']):
            asset = Asset.objects.get(pk=request.data['pk'])

            # saving history
            history = AssetHistory()
            history.fromUser = asset.user
            history.toUser = self.request.user
            history.asset = asset
            history.save()

            # saving asset
            asset.user = self.request.user
            asset.next_user = None
            asset.save()

            return JsonResponse({'detail': 'Asset assigned'}, status=status.HTTP_200_OK)
        else:
            return JsonResponse({'detail': 'Asset assign failed'}, status=status.HTTP_406_NOT_ACCEPTABLE)

    def put(self, request, *args, **kwargs):
        if (request.data['pk']):
            asset = Asset.objects.get(pk=request.data['pk'])

            # declining asset transfer request
            asset.next_user = None
            asset.save()

            return JsonResponse({'detail': 'Asset declined'}, status=status.HTTP_200_OK)
        else:
            return JsonResponse({'detail': 'Asset declination failed'}, status=status.HTTP_406_NOT_ACCEPTABLE)

class AssetUpdateView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [JSONParser]

    def get(self, request, *args, **kwargs):
        if (request.user.profile.canManageAsset is False):
            return JsonResponse({'detail': 'Permission Denied'}, status=status.HTTP_406_NOT_ACCEPTABLE)

        asset = Asset.objects.get(pk=self.kwargs['pk'])
        return JsonResponse({
                'asset': json.dumps(asset.as_json()),
                'status': json.dumps(STATUS_CHOICE),
            }, status = status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        if (request.user.profile.canManageAsset is False):
            return JsonResponse({'detail': 'Permission Denied'}, status=status.HTTP_406_NOT_ACCEPTABLE)

        # adding (self, request, *args, **kwargs) to post/get will also work to get items from url
        item = Asset.objects.get(pk=self.kwargs['pk'])
        item.name = request.data['name']
        item.warranty = int(request.data['warranty'])
        item.status = int(request.data['status'])
        item.description = request.data['description']
        item.save()
        return JsonResponse({'detail': 'Asset updated'}, status=status.HTTP_200_OK)
