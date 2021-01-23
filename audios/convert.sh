#!/bin/bash

for i in *.mp4 ; do 
    ffmpeg -i "$i" -acodec libmp3lame "$(basename "${i/.mp4}")".mp3
done
