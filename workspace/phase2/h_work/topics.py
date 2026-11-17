import urllib.request,re,time,json,sys
topics="""text-to-speech speech-recognition voice-cloning speech-to-text tts asr whisper voice-assistant voice-conversion speech-synthesis voice-agent audio-processing speaker-diarization music-generation text-to-music wake-word singing-voice-synthesis
vision-language-model multimodal vlm object-detection image-segmentation video-understanding segment-anything 3d-reconstruction depth-estimation gaussian-splatting nerf ocr multimodal-llm face-recognition pose-estimation object-tracking yolo
stable-diffusion text-to-image text-to-video image-generation video-generation diffusion-models comfyui comfyui-nodes flux talking-head lip-sync avatar image-upscaling super-resolution image-editing text-to-3d image-to-3d lora-training controlnet face-swap deepfake image-restoration background-removal ai-art video-editing""".split()
seen={}
for t in topics:
    for p in (1,2,3):
        url=f"https://github.com/topics/{t}?o=desc&s=stars"+(f"&page={p}" if p>1 else "")
        for attempt in range(3):
            try:
                h=urllib.request.urlopen(urllib.request.Request(url,headers={"User-Agent":"Mozilla/5.0"}),timeout=30).read().decode()
                break
            except Exception as e:
                if '429' in str(e): time.sleep(60)
                else: h="";break
        else: h=""
        # repo links in h3 headings
        for o,n in re.findall(r'href="/([A-Za-z0-9_.-]+)/([A-Za-z0-9_.-]+)"',h):
            if o.lower() in ("topics","sponsors","features","orgs","login","about","collections","marketplace","settings","enterprise","pricing","apps","resources","readme","security","customer-stories","solutions","trending","explore","site","contact","premium-support","why-github","github","team","users","signup","join","notifications","search","pulls","issues","codespaces","newsroom","partners","events","education","community","stars","sitemap","models","copilot","login","new","orgs","topics") or n.startswith(("followers","following")): continue
            seen.setdefault(o+"/"+n,set()).add(t)
        time.sleep(2)
    print(t,len(seen),file=sys.stderr)
json.dump({k:sorted(v) for k,v in seen.items()},open("topics.json","w"))
