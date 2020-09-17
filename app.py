from flask import Flask, request, session, render_template, redirect, flash
import requests
import json

app = Flask(__name__);

app.secret_key = '123432rwfsdfasdf3qwrfsdvawerrwerfs';


@app.route('/')
def index():
  url_list = []
  return render_template('index.html', url_list=url_list);

@app.route('/clear')
def clear():
  session['url_content'] = { "short_url": "", "long_url": "" }
  return redirect('/')

@app.route('/url', methods=['POST'])
def url():
  url = request.form['url']
  if 'https://' not in url or url == '':
    flash('URL Must include https://', 'error')
    return redirect('/')
  key = 'cd163a1af85f45feacead0f81d50724a'
  linkRequest = {
    "destination": url,
    "domain": { "fullName": "rebrand.ly" }
  }

  requestHeaders = {
    "Content-Type": "application/json",
    "apikey": key
  }

  r = requests.post('https://api.rebrandly.com/v1/links',
      data = json.dumps(linkRequest),
      headers = requestHeaders)
  
  if (r.status_code == requests.codes.ok):
      link = r.json()
      print("Long URL was %s, short URL is %s" % (link["destination"], link["shortUrl"]))
      session['url_content'] = {"short_url": link['shortUrl'], "long_url": url }
  return redirect('/')

if __name__ == "__main__":
  app.run(debug=True)