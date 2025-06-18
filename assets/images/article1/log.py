import numpy as np
import matplotlib.pyplot as plt
import matplotlib.gridspec as gridspec

# 1. Избираме набор от данни, които обхващат множество порядъци
# Използваме стойности, които ясно показват разликата между скалите
values = np.array([1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000])

# Създаваме фигура с два подграфика един до друг
fig = plt.figure(figsize=(12, 6)) # Увеличена ширина за по-добро сравнение един до друг
gs = gridspec.GridSpec(1, 2, width_ratios=[1, 1]) # 1 ред, 2 колони, равни ширини

# --- Ляв график: Линейна скала ---
ax0 = fig.add_subplot(gs[0]) # Първи подграфик

ax0.plot(np.arange(len(values)), values, marker='o', linestyle='-', color='blue')
ax0.set_yscale('linear') # Изрично задаваме линейна скала
ax0.set_title('Линейна скала')
ax0.set_xlabel('Индекс')
ax0.set_ylabel('Стойност (Линейна)')
ax0.grid(True, which="both", ls="-", alpha=0.6) # Показваме мрежа за по-добра визуализация
ax0.set_ylim(0, values.max() * 1.1) # Задаваме Y-лимити, за да покажем началото от 0

# Добавяме някои персонализирани отметки, за да покажем разстоянието между тях
linear_ticks = [1, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000]
ax0.set_yticks(linear_ticks)
ax0.set_yticklabels([f'{int(tick):,}' for tick in linear_ticks])

# Подчертаваме някои абсолютни разлики
ax0.annotate('Абсолютна разлика от 1000', xy=(2, 1000), xytext=(3, 2000),
             arrowprops=dict(facecolor='black', shrink=0.05, width=1, headwidth=8),
             horizontalalignment='left', verticalalignment='bottom')
ax0.annotate('', xy=(9, 10000), xytext=(10, 10000+1000), # Още една абсолютна разлика от 1000
             arrowprops=dict(facecolor='black', shrink=0.05, width=1, headwidth=8))
ax0.text(3.5, 3000, "Равни абсолютни разстояния", fontsize=9, color='gray')


# --- Десен график: Логаритмична скала ---
ax1 = fig.add_subplot(gs[1], sharex=ax0) # Втори подграфик, споделя X-ос с първия

ax1.plot(np.arange(len(values)), values, marker='o', linestyle='-', color='red')
ax1.set_yscale('log') # Задаваме логаритмична скала
ax1.set_title('Логаритмична скала (основа 10)')
ax1.set_xlabel('Индекс')
ax1.set_ylabel('Стойност (Логаритмична)')
ax1.grid(True, which="both", ls="-", alpha=0.6) # Показваме мрежа за по-добра визуализация
ax1.set_ylim(0.8, values.max() * 1.5) # Задаваме Y-лимити, логаритмичните скали не могат да започнат от 0

# Добавяме някои персонализирани отметки, за да покажем разстоянието между тях
log_ticks = [1, 10, 100, 1000, 10000]
ax1.set_yticks(log_ticks)
ax1.set_yticklabels([f'{int(tick):,}' for tick in log_ticks]) # Форматираме с запетая за хиляди

# Подчертаваме някои относителни разлики
ax1.annotate('10 пъти увеличение (от 1 до 10)', xy=(0.5, 1), xytext=(1.5, 5),
             arrowprops=dict(facecolor='black', shrink=0.05, width=1, headwidth=8),
             horizontalalignment='left', verticalalignment='bottom')
ax1.annotate('10 пъти увеличение (от 100 до 1000)', xy=(6.5, 100), xytext=(7.5, 500),
             arrowprops=dict(facecolor='black', shrink=0.05, width=1, headwidth=8),
             horizontalalignment='left', verticalalignment='bottom')
ax1.text(2, 50, "Равни относителни разстояния", fontsize=9, color='gray')

# Общо заглавие за фигурата
fig.suptitle('Сравнение на линейна спрямо логаритмична скала', fontsize=16)

plt.tight_layout(rect=[0, 0.03, 1, 0.95]) # Регулираме оформлението, за да предотвратим застъпване на заглавия
plt.show()

# Можете да запазите тази фигура като PNG или JPEG файл
# plt.savefig('linear_vs_log_scales.png', dpi=300)