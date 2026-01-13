import pyautogui
import time

# Пауза перед стартом, чтобы вы успели переключить окно
print("У вас есть 3 секунды, чтобы открыть нужное окно...")
time.sleep(3)

try:
    while True:
        pyautogui.click()  # Кликает в текущем месте
        time.sleep(0.1)    # Задержка между кликами (10 кликов в секунду)
except KeyboardInterrupt:
    print("\nПрограмма остановлена вручную.")
