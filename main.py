#!/usr/bin/env python3
import sys
from flask import Flask, send_from_directory, abort, Response, request
from pathlib import Path
import os
import webbrowser

app = Flask(__name__)

if getattr(sys, 'frozen', False):
    cwd = sys._MEIPASS
else:
    cwd = Path(__file__).resolve().parent

paths_folder = Path(os.getcwd()) / "paths"
paths_folder.mkdir(parents=True, exist_ok=True)

def check_safe(filename):
    parent = Path(os.getcwd() + "/paths").resolve()
    test = (parent / filename).resolve()

    if filename == '/':
        test = parent

    if test.is_relative_to(parent):
        return test
    else:
        return False

@app.route("/", methods=["GET"])
def index():
    return send_from_directory(path="index.html", directory=os.path.join(cwd, "out"))

@app.route("/<path:path>", methods=["GET"])
def get_ws(path):
    return send_from_directory(path=path, directory=os.path.join(cwd, "out"))

@app.route("/api/list")
def get_contents():
    filepath = check_safe("/")
    if filepath:
        jsonfiles = []
        for root, dirs, files in os.walk(filepath):
            for file in files:
                if file.lower().endswith(".json"):
                    path = os.path.join(root, file)
                    jsonfiles.append(path)

        jsonfiles = [os.path.relpath(path, check_safe("/")) for path in jsonfiles]

        return jsonfiles
    else:
        abort(403)

@app.route("/api/<path:path>", methods=["GET"])
def get(path):
    return send_from_directory(path=path, directory=check_safe("/"))

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

webbrowser.open("http://localhost:8081")

app.run(port=8081, host="")
