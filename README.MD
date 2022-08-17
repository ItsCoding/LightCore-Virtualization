## LightCore-Virtualization
This project is to make the development on light effects more easy

#### Installation
For this to run you need NodeJs >= 16
```bash
cd LightCore-Virtualization-Electron
yarn
yarn start
```

#### Installation of audio-reactive-led-strip
To be able to install pyaudio on mac do this:
```bash
export LDFLAGS=-L/opt/homebrew/lib
export CPPFLAGS=-I/opt/homebrew/include
brew install portaudio
pip install pyaudio
```

#### Installation of GroundControl
Download the installer from this [Link](https://groundcontrolcaster.s3.eu-west-2.amazonaws.com/CASTER_v2.0.9.pkg "Link")
Install it and it should theoreticly work after restart. Maybe make sure that "Caster" is open and you chose the "CASTER Stream Mix 1" mic and audio output in the Mac Sound Settings. If you dont hear the sound, chose your Headphones underneath the Hearing symbol. In the column where the Headphon symbol is.

#### Usage
Run the Virtualization first then the python script
```bash
yarn start
```
```bash
cd {YOUR_GIT_FOLDER}/audio-reactive-led-strip/python
python visualization.py
```

Do to that the python project is yet not ready for rendering multiple independent led strips, the virtualization has two checkboxes. With that you can toggle wether the incomming frames should be applied to the triangle or middle strip.