import numpy as np
from PIL import Image

def hsl_to_rgb(h, s, l):
    """
    Конвертира HSL (Hue, Saturation, Lightness) цвят в RGB.
    Входните стойности за h са в [0, 360], s и l са в [0, 100].
    Връща RGB стойности в [0, 255].
    """
    s /= 100
    l /= 100
    c = (1 - abs(2 * l - 1)) * s
    x = c * (1 - abs((h / 60) % 2 - 1))
    m = l - c / 2
    r, g, b = 0, 0, 0

    if 0 <= h < 60:
        r, g, b = c, x, 0
    elif 60 <= h < 120:
        r, g, b = x, c, 0
    elif 120 <= h < 180:
        r, g, b = 0, c, x
    elif 180 <= h < 240:
        r, g, b = 0, x, c
    elif 240 <= h < 300:
        r, g, b = x, 0, c
    elif 300 <= h < 360:
        r, g, b = c, 0, x

    return (int((r + m) * 255), int((g + m) * 255), int((b + m) * 255))

def generate_julia_fractal(width, height, c_re, c_im,
                           zoom=1.0, x_offset=0.0, y_offset=0.0,
                           max_iterations=500, bailout_radius_squared=4):
    """
    Генерира изображение на фрактал на Джулия.

    Аргументи:
    width (int): Ширина на изображението в пиксели.
    height (int): Височина на изображението в пиксели.
    c_re (float): Реална част на комплексната константа 'c' за Джулия множеството.
    c_im (float): Имагинерна част на комплексната константа 'c' за Джулия множеството.
    zoom (float): Фактор на увеличение. По-голяма стойност означава по-голямо увеличение.
    x_offset (float): Хоризонтално отместване на центъра.
    y_offset (float): Вертикално отместване на центъра.
    max_iterations (int): Максимален брой итерации за всяка точка.
    bailout_radius_squared (float): Квадрат на радиуса на изхода.
                                    Ако abs(z) надхвърли това, точката не принадлежи.

    Връща:
    PIL.Image.Image: Генерираното фрактално изображение.
    """

    image = Image.new("RGB", (width, height))
    pixels = image.load()

    # Определяне на обхвата в комплексната равнина
    # Тези стойности определят видимата част от фрактала
    # Adjust for aspect ratio
    aspect_ratio = width / height
    re_min = -2.0 / zoom + x_offset
    re_max = 2.0 / zoom + x_offset
    im_min = -2.0 / aspect_ratio / zoom + y_offset
    im_max = 2.0 / aspect_ratio / zoom + y_offset

    # Изчисляване на фрактала за всеки пиксел
    for x in range(width):
        for y in range(height):
            # Мапване на пикселни координати към координати в комплексната равнина
            # z0 е началната точка
            z_re = re_min + (x / width) * (re_max - re_min)
            z_im = im_min + (y / height) * (im_max - im_min)

            iterations = 0
            # Изпълняване на итерации z = z*z + c
            # z е променлива, c е константа за Джулия множеството
            while iterations < max_iterations and (z_re * z_re + z_im * z_im) < bailout_radius_squared:
                temp_re = z_re * z_re - z_im * z_im + c_re
                temp_im = 2 * z_re * z_im + c_im
                z_re = temp_re
                z_im = temp_im
                iterations += 1

            # Оцветяване на пиксела
            if iterations == max_iterations:
                # Точката е вътре в множеството, оцветяваме в черно
                pixels[x, y] = (0, 0, 0)
            else:
                # Използваме техника за гладко оцветяване
                # Изчисляваме "nu" за по-плавни преходи
                log_zn = np.log(z_re * z_re + z_im * z_im) / 2
                nu = iterations + 1 - np.log(log_zn) / np.log(2)

                # Адаптирана цветова схема за златисти, розови, лилави и зеленикави тонове
                # Тази част е персонализирана, за да наподобява вашата референция.
                # Можете да променяте тези стойности, за да създадете различни палитри.
                
                # Приблизителен цикъл за цветове
                hue_cycle = nu * 15 % 360 # Контролира колко бързо се сменят цветовите тонове

                # Регулиране на Hue
                hue = 0
                if hue_cycle < 60: # Златисто-оранжево
                    hue = 40 + (hue_cycle / 60) * 20 # 40-60
                elif hue_cycle < 120: # Розово-червено
                    hue = 330 + ((hue_cycle - 60) / 60) * 30 # 330-360
                elif hue_cycle < 180: # Лилаво-магента
                    hue = 270 + ((hue_cycle - 120) / 60) * 30 # 270-300
                elif hue_cycle < 240: # Зеленикаво
                    hue = 90 + ((hue_cycle - 180) / 60) * 60 # 90-150
                else: # Отново към златисто-оранжево
                    hue = 40 + ((hue_cycle - 240) / 120) * 20


                # Сатурация (наситеност) - висока за ярки цветове
                saturation = 80 + 20 * np.sin(nu * 0.1) # лека вариация за динамика
                saturation = np.clip(saturation, 50, 100) # Ограничаване между 50% и 100%

                # Яркост (светлина) - регулирана за метален блясък
                # Използване на синусоидна функция, за да създаде "блясък" ефект
                lightness = 30 + 40 * np.sin(nu * 0.4 + np.pi / 4)
                lightness = np.clip(lightness, 10, 90) # Ограничаване между 10% и 90%

                pixels[x, y] = hsl_to_rgb(hue, saturation, lightness)

    return image

# ---- Конфигурация на изображението и фрактала ----
# HD резолюция (можете да промените)
IMAGE_WIDTH = 1920
IMAGE_HEIGHT = 1080

# Параметри за Джулия множеството (c = c_re + c_im * i)
# Експериментирайте с тези стойности, за да видите различни форми!
# Някои добри стойности:
# c = -0.7 + 0.27015i (класически "зайче")
# c = -0.8 + 0.156i
# c = -0.7269 + 0.1889i (близко до вашето изображение)
# c = -0.74543 + 0.11301i (спирала)
C_REAL = -0.7269 # Реална част на c
C_IMAGINARY = 0.1889 # Имагинерна част на c

# Параметри за изгледа на фрактала
FRACTAL_ZOOM = 1.0 # Увеличение (1.0 е стандартно)
X_OFFSET = 0.0     # Хоризонтално изместване (0.0 е център)
Y_OFFSET = 0.0     # Вертикално изместване (0.0 е център)

# Параметри за изчисление
MAX_ITERATIONS = 500 # По-висок брой за по-добро качество и детайли
BAILOUT_RADIUS_SQUARED = 4 # Стандартен радиус на изхода

# Генериране на фрактала
print(f"Генериране на фрактал на Джулия с резолюция {IMAGE_WIDTH}x{IMAGE_HEIGHT}...")
julia_image = generate_julia_fractal(IMAGE_WIDTH, IMAGE_HEIGHT,
                                      C_REAL, C_IMAGINARY,
                                      zoom=FRACTAL_ZOOM,
                                      x_offset=X_OFFSET,
                                      y_offset=Y_OFFSET,
                                      max_iterations=MAX_ITERATIONS,
                                      bailout_radius_squared=BAILOUT_RADIUS_SQUARED)

# Записване на изображението
output_filename = "julia_fractal_hd.png"
julia_image.save(output_filename)
print(f"Фракталът е запазен като '{output_filename}'")
