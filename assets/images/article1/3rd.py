import numpy as np
import matplotlib.pyplot as plt
import imageio
import os
from scipy.optimize import newton

# Параметри
a = 1.5    # голяма полуос
b = 1.0    # малка полуос
c = np.sqrt(a**2 - b**2)  # фокусно разстояние
T = a**1.5  # период според третия закон (приближено)

# Ексцентрицитет
e = c / a

frames = 100
times = np.linspace(0, T, frames)

if not os.path.exists('frames'):
    os.makedirs('frames')

filenames = []

def kepler_eq(E, M, e):
    return E - e*np.sin(E) - M

def true_anomaly(E, e):
    # изчисляване на истински аномален ъгъл от ексцентрик
    return 2 * np.arctan2(np.sqrt(1+e)*np.sin(E/2), np.sqrt(1-e)*np.cos(E/2))

for i, t in enumerate(times):
    plt.figure(figsize=(12,12))
    ax = plt.gca()
    
    # Средно аномално движение (M) - линейно с времето
    M = 2*np.pi * t / T
    
    # Решаваме уравнението на Кеплер за ексцентрик ъгъл E
    E = newton(kepler_eq, M, args=(M,e))
    
    # Изчисляваме истинския аномален ъгъл θ
    theta = -true_anomaly(E, e)
    
    r = a*(1 - e**2) / (1 + e*np.cos(theta))
    x = r * np.cos(theta) + c
    y = r * np.sin(theta)

    # === НАСТРОЙКИ ЗА ВИЗУАЛИЗАЦИЯ ===
    planet_marker_size = 20
    star_marker_size = 30
    title_fontsize = 24
    legend_fontsize = 18
    line_width = 3  # дебелина на орбитата

    # Рисуваме звездата във фокус (-c,0)
    ax.plot(c, 0, 'yo', markersize=star_marker_size, label='Звезда (фокус)')
    
    # Планетата
    ax.plot(x, y, 'bo', markersize=planet_marker_size, label='Планета')
    
    # Орбитална пътека (елипса)
    ellipse_theta = np.linspace(0, 2*np.pi, 300)
    ellipse_x = a * np.cos(ellipse_theta)
    ellipse_y = b * np.sin(ellipse_theta)
    ax.plot(ellipse_x, ellipse_y, 'gray', linestyle='--', linewidth=line_width, label='Орбитa')
    
    ax.set_xlim(-2*a, 2*a)
    ax.set_ylim(-2*a, 2*a)
    ax.set_aspect('equal')
    ax.set_title(f'Трети закон на Кеплер с реална орбита\nT={T:.2f}, t={t:.2f}', fontsize=title_fontsize)
    ax.legend(loc='upper right', fontsize=legend_fontsize)
    ax.axis('off')
    
    filename = f'frames/frame_{i:03d}.png'
    plt.savefig(filename)
    plt.close()
    filenames.append(filename)

with imageio.get_writer('kepler_realistic.gif', mode='I', duration=0.05, loop=0) as writer:
    for filename in filenames:
        image = imageio.imread(filename)
        writer.append_data(image)

for filename in filenames:
    os.remove(filename)

print("GIF 'kepler_realistic.gif' е създаден успешно с реалистично движение и звезда във фокус!")
