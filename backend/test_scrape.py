import urllib.request
from bs4 import BeautifulSoup
import re

url = "https://schedule.sxsw.com/2026/events/FS19113"

try:
    req = urllib.request.Request(url, headers={'User-Agent': "Mozilla/5.0"})
    html = urllib.request.urlopen(req).read()
    soup = BeautifulSoup(html, 'html.parser')
    
    # Buscamos aea tags relacionados a speakers
    # sx-speaker-link
    speakers = []
    for a in soup.find_all('a', href=True):
        if '/speakers/' in a['href'] or '/2026/speakers/' in a['href']:
            speakers.append({'name': a.text.strip(), 'url': a['href']})
            
    # Remove duplicates
    seen = set()
    unique_speakers = []
    for s in speakers:
        if s['url'] not in seen and s['name']:
            seen.add(s['url'])
            unique_speakers.append(s)
            
    print("Found speakers:", unique_speakers)
except Exception as e:
    print(e)
