
import os
import requests
from flask import Flask, request, jsonify
from dotenv import load_dotenv

load_dotenv()  # loads .env file

app = Flask(__name__)

from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/')
def home():
    return "Welcome to What Should I Watch Next!"

@app.route('/search')
def search():
    title = request.args.get('title')
    api_key = os.getenv("TMDB_API_KEY")

    if not title:
        return jsonify({"error": "No title provided"}), 400

    url = f"https://api.themoviedb.org/3/search/movie"
    params = {
        "api_key": api_key,
        "query": title
    }

    response = requests.get(url, params=params)
    if response.status_code != 200:
        return jsonify({"error": "TMDb API failed"}), 500

    data = response.json()

    # Just return first 5 results for now
    results = []
    for movie in data.get("results", [])[:5]:
        results.append({
            "title": movie["title"],
            "overview": movie["overview"],
            "poster": f"https://image.tmdb.org/t/p/w500{movie['poster_path']}" if movie.get("poster_path") else None,
            "release_date": movie.get("release_date")
        })

    return jsonify(results)


if __name__ == '__main__':
    app.run(debug=True)
