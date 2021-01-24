#!/bin/bash

for i in *.wav ; do 
    ffmpeg -i "$i" -acodec libmp3lame "$(basename "${i/.wav}")".mp3
done
