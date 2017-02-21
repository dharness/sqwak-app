import soundfile as sf

data, samplerate = sf.read('out.wav')
print(data)
