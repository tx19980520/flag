<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller;
use Illuminate\Http\Request;
use App\Repositories\NewsRepository;

class NewsController extends Controller
{
    public function getNews(Request $request, NewsRepository $repository)
    {
        $type = $request->get('type');
        $news = $repository->getNewsByType($type);
        return response()->json(['status' => 200, 'news' => $news]);
    }
}
