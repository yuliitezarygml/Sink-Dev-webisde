@echo off
set "input_dir=photo"
set "output_dir=photo_resized"

if not exist "%output_dir%" mkdir "%output_dir%"

for %%i in ("%input_dir%\*.jpg", "%input_dir%\*.jpeg", "%input_dir%\*.png") do (
    echo Processing: %%~nxi
    ffmpeg -i "%%i" -vf "scale=1280:-2" -q:v 2 "%output_dir%\%%~nxi" -y
)

pause
