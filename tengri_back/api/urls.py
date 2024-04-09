from django.urls import path, include
from .views import *
urlpatterns = [
    path('news/', get_news),
    path('news/<int:id>/', get_news_by_id),
    path('news/main', get_main_news),
    path('categories/', get_categories),
    path('categories/<int:id>/news', get_news_by_category),
    path('latestnews/', get_latest_news ),
]
