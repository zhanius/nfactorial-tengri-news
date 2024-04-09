import random
from django.core.paginator import Paginator,EmptyPage,PageNotAnInteger
from django.shortcuts import render
from django.http.response import HttpResponse, JsonResponse
import json,requests
from api.models import News, Category


# Create your views here.
def get_news(request):
    try:
        get_news_from_api()
    except:
        pass
    news = News.objects.all()
    news_per_page = 5
    news_json = [n.to_json() for n in news]
    paginator = Paginator(news_json, news_per_page)
    page_number = request.GET.get('page')
    try:
        page_news = paginator.page(page_number)
    except PageNotAnInteger:
        page_news = paginator.page(1)
    except EmptyPage:
        page_news = paginator.page(paginator.num_pages)

    news_json = [n for n in page_news]
    return JsonResponse(news_json, safe=False)


def get_news_by_id(request, id = None):
    try:
        news = News.objects.get(id = id)
        news_json = {
            'title': news.title,
            'description': news.description,
            'date': news.publish_date,
            'category': news.category.name,
            'photo': news.photo
        }
        return JsonResponse(news_json)

    except News.DoesNotExist as e:
        return JsonResponse(
            {
                'error': str(e)
            }
        )

def get_categories(request):
    categories = Category.objects.all()
    categories_json = [category.to_json() for category in categories]
    return JsonResponse(categories_json, safe=False)

def get_news_by_category(request, id = None):
    try:
        category = Category.objects.get(id = id)
        news = News.objects.filter(category = category)
        news_json = [n.to_json() for n in news]
        return JsonResponse(news_json, safe=False)
    except News.DoesNotExist as e:
        return JsonResponse(
            {
                'error': str(e)
            }
        )


def get_news_from_api():
    response = requests.get('https://newsdata.io/api/1/news?apikey=pub_41346c25cce4d24ce39c3ac00a380cff4177f&q=%D0%BA%D0%B0%D0%B7%D0%B0%D1%85%D1%81%D1%82%D0%B0%D0%BD&country=kz')
    data = response.json()
    news = []
    categories = Category.objects.all()
    for result in data.get('results', []):
            category_id = random.randint(1,len(categories))
            category = Category.objects.get(id = category_id)
            new, created = News.objects.update_or_create(
                title=result.get('title'),
                defaults={
                    'description': result.get('description'),
                    'publish_date': result.get('pubDate'),
                    'category': category,
                    'photo': result.get('image_url')
                }
            )


def get_main_news(request):
    news = News.objects.last()
    news_json = {
        'id': news.id,
        'title': news.title,
        'description': news.description,
        'date': news.publish_date,
        'category': news.category.name,
        'photo': news.photo
    }
    return JsonResponse(news_json)



def get_latest_news(request):
    latest_news = News.objects.order_by('publish_date')
    latest_news_json = [n.to_json() for n in latest_news]
    return JsonResponse(latest_news_json, safe=False)


def get_news_by_category(request, id = None):
    try:
        category = Category.objects.get(id = id)
        news = News.objects.filter(category = category)
        news_json = [n.to_json() for n in news]
        return JsonResponse(news_json, safe=False)
    except News.DoesNotExist as e:
        return JsonResponse(
            {
                'error': str(e)
            }
        )

