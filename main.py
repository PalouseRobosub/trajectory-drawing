#!/usr/bin/env python3

from flask import Flask, send_from_directory, abort, Response, request
from pathlib import Path
import os
import json
import webbrowser

app = Flask(__name__)

def check_safe(filename):
    parent = Path("./paths").resolve()
    test = (parent / filename).resolve()

    if filename == '/':
        test = parent

    if test.is_relative_to(parent):
        return test
    else:
        return False

@app.route("/", methods=["GET"])
def index():
    return send_from_directory(path="index.html", directory='./out')

@app.route("/<path:path>", methods=["GET"])
def get_ws(path):
    return send_from_directory(path=path, directory='./out')

@app.route("/api/list", defaults={'path': '/'})
@app.route("/api/list/<path:path>")
def get_contents(path):
    filepath = check_safe(path)
    if filepath:
        return os.listdir(filepath)
    else:
        abort(403)

@app.route("/api/<path:path>", methods=["GET"])
def get(path):
    return send_from_directory(path=path, directory='./paths')

@app.route("/api/<path:path>", methods=["PUT"])
def put(path):
    filepath = check_safe(path)
    if not filepath:
        abort(403)
    with open(filepath, "wb") as f:
        n = f.write(request.get_data())
    return Response(f"wrote {n} bytes to {filepath}\n", headers={"Content-Type":"text/plain"})

@app.route("/api/<path:path>", methods=["DELETE"])
def delete(path):
    filepath = check_safe(path)
    if not filepath:
        abort(403)
    os.remove(filepath)
    return Response(f"removed {filepath}\n", headers={"Content-Type":"text/plain"})

# webbrowser.open("http://localhost:8081")

app.run(port=8081, host="")