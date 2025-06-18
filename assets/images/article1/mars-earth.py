import numpy as np
import matplotlib.pyplot as plt
import imageio
import os
from scipy.optimize import newton

# Параметри за Земята
a_earth = 1.0     # голяма полуос (AU)
e_earth = 0.0167  # ексцентрицитет
b_earth = np.sqrt(a_earth**2 - (a_earth * e_earth)**2)
c_earth = a_earth * e_earth
T_earth = a_earth**1.5  # период по 3ти закон (в земни години)

# Параметри за Марс
a_mars = 1.52
e_mars = 0.0934
b_mars = np.sqrt(a_mars**2 - (a_mars * e_mars)**2)
c_mars = a_mars * e_mars
T_mars = a_mars**1.5  # период в земни години (~1.88)

frames = 150
times = np.linspace(0, max(T_earth, T_mars), frames)

if not os.path.exists('frames'):
    os.makedirs('frames')

filenames = []

def kepler_eq(E, M, e):
    return E - e*np.sin(E) - M

def true_anomaly(E, e):
    return 2 * np.arctan2(np.sqrt(1+e)*np.sin(E/2), np.sqrt(1-e)*np.cos(E/2))

for i, t in enumerate(times):
    plt.figure(figsize=(12,12))
    ax = plt.gca()
    
    # Земя
    M_earth = 2*np.pi * t / T_earth
    E_earth = newton(kepler_eq, M_earth, args=(M_earth, e_earth))
    theta_earth = -true_anomaly(E_earth, e_earth)
    r_earth = a_earth*(1 - e_earth**2) / (1 + e_earth*np.cos(theta_earth))
    x_earth = r_earth * np.cos(theta_earth) + c_earth
    y_earth = r_earth * np.sin(theta_earth)
    
    # Марс
    M_mars = 2*np.pi * t / T_mars
    E_mars = newton(kepler_eq, M_mars, args=(M_mars, e_mars))
    theta_mars = -true_anomaly(E_mars, e_mars)
    r_mars = a_mars*(1 - e_mars**2) / (1 + e_mars*np.cos(theta_mars))
    x_mars = r_mars * np.cos(theta_mars) + c_mars
    y_mars = r_mars * np.sin(theta_mars)
    
    # Звезда (Слънце) - взимаме фокус при (c,0), който е в позитивната посока
    # За простота да поставим Слънцето в (0,0) и да изместим планетите според фокусите им
    ax.plot(0, 0, 'yo', markersize=25, label='Слънце (фокус)')

    # Орбити - елипси
    theta_orbit = np.linspace(0, 2*np.pi, 300)
    
    # Земя - елипса
    ellipse_x_earth = a_earth * np.cos(theta_orbit)
    ellipse_y_earth = b_earth * np.sin(theta_orbit)
    ax.plot(ellipse_x_earth, ellipse_y_earth, 'b--', label='Орбита на Земята')
    
    # Марс - елипса
    ellipse_x_mars = a_mars * np.cos(theta_orbit)
    ellipse_y_mars = b_mars * np.sin(theta_orbit)
    ax.plot(ellipse_x_mars, ellipse_y_mars, 'r--', label='Орбита на Марс')
    
    # Планети
    ax.plot(x_earth, y_earth, 'bo', markersize=15, label=f'Земя (T={T_earth:.2f} г.)')
    ax.plot(x_mars, y_mars, 'ro', markersize=15, label=f'Марс (T={T_mars:.2f} г.)')
    
    ax.set_xlim(-2 * a_mars, 2 * a_mars)
    ax.set_ylim(-2 * a_mars, 2 * a_mars)
    ax.set_aspect('equal')
    ax.set_title('Орбити на Земята и Марс около Слънцето\n(Трети закон на Кеплер)')
    ax.legend(loc='upper right', fontsize=12)
    ax.axis('off')
    
    filename = f'frames/frame_{i:03d}.png'
    plt.savefig(filename)
    plt.close()
    filenames.append(filename)

with imageio.get_writer('earth_mars_orbits.gif', mode='I', duration=0.05, loop=0) as writer:
    for filename in filenames:
        image = imageio.imread(filename)
        writer.append_data(image)

# Изтриваме временните файлове
for filename in filenames:
    os.remove(filename)

print("GIF 'earth_mars_orbits.gif' е създаден успешно!")
