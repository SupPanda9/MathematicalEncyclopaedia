import matplotlib.pyplot as plt
plt.rcParams['font.family'] = 'DejaVu Sans'
import networkx as nx
import imageio
import numpy as np
import os
import random
from matplotlib.offsetbox import OffsetImage, AnnotationBbox
from PIL import Image

# ==== Конфигурация ====
n_steps = 20
n_ants = 3
steps_per_ant = 5
decay = 0.85
pheromone_boost = 1.0

alpha = 1.0  # влияние на феромона
beta = 4.0   # влияние на разстоянието

# ==== Дефиниране на графа ====
G = nx.DiGraph()
edges = [
    ('Гнездо', 'A'), ('Гнездо', 'B'),
    ('A', 'C'), ('A', 'D'), ('B', 'D'), ('B', 'E'),
    ('C', 'F'), ('D', 'F'), ('E', 'F'),
    ('F', 'Храна')
]
positions = {
    'Гнездо': (0, 0), 'A': (-2, 1), 'B': (2, 1),
    'C': (-3, 2), 'D': (0, 2), 'E': (3, 2),
    'F': (0, 3), 'Храна': (0, 4)
}
pheromones = {edge: 1.0 for edge in edges}
G.add_edges_from(edges)

# Изчисляване на дължините на ръбовете
edge_lengths = {}
for (u, v) in edges:
    x1, y1 = positions[u]
    x2, y2 = positions[v]
    dist = np.hypot(x2 - x1, y2 - y1)
    G[u][v]['length'] = dist
    edge_lengths[(u, v)] = dist

# ==== Зареждане на изображението на мравка ====
ant_icon_path = "ant.png"  # Увери се, че ant.png е в същата директория!
ant_img_array = plt.imread(ant_icon_path)

# ==== Полезни функции ====

heuristic_dist = nx.single_source_dijkstra_path_length(G, 'Храна', weight='length')

def choose_next(node):
    neighbors = list(G.successors(node))
    pher = [pheromones[(node, nbr)] ** alpha for nbr in neighbors]
    dists = [edge_lengths[(node, nbr)] for nbr in neighbors]
    heuristics = [heuristic_dist.get(nbr, 1e-6) for nbr in neighbors]  # да избегнем делене на 0

    # Комбинираме дължината на реброто с евристичното разстояние
    # по начин, който наказва избор на ребро с голямо разстояние или голяма евристика
    weights = [p / ((d * h) ** beta) if d > 0 and h > 0 else 0 for p, d, h in zip(pher, dists, heuristics)]

    total = sum(weights)
    if total == 0:
        return random.choice(neighbors)
    probs = [w / total for w in weights]
    return random.choices(neighbors, probs)[0]


def simulate_ant():
    path = ['Гнездо']
    while path[-1] != 'Храна':
        next_node = choose_next(path[-1])
        path.append(next_node)
    return path

def interpolate(p1, p2, t):
    return (p1[0]*(1 - t) + p2[0]*t, p1[1]*(1 - t) + p2[1]*t)

def draw_graph(step, pheromones, ant_positions, filename, highlight_path=None):
    plt.figure(figsize=(9, 7))
    ax = plt.gca()

    edge_colors = [pheromones[edge] for edge in G.edges()]
    nx.draw_networkx_nodes(G, pos=positions, node_size=2000, node_color='lightgrey')
    nx.draw_networkx_edges(G, pos=positions, edge_color=edge_colors, edge_cmap=plt.cm.Blues, width=4)
    nx.draw_networkx_labels(G, pos=positions, font_size=12, font_weight='bold')

    # Покажи феромон и разстояние на ръбовете
    edge_labels = {
        edge: f"{pheromones[edge]:.1f}\n{edge_lengths[edge]:.2f}" for edge in G.edges()
    }
    nx.draw_networkx_edge_labels(G, pos=positions, edge_labels=edge_labels, font_size=10)

    for pos in ant_positions:
        ant_icon = OffsetImage(ant_img_array, zoom=0.25)
        ab = AnnotationBbox(ant_icon, pos, frameon=False)
        ax.add_artist(ab)

    if highlight_path:
        best_edges = [(highlight_path[i], highlight_path[i+1]) for i in range(len(highlight_path)-1)]
        nx.draw_networkx_edges(G, pos=positions, edgelist=best_edges, edge_color='red', width=6)

    sm = plt.cm.ScalarMappable(cmap=plt.cm.Blues, norm=plt.Normalize(vmin=1.0, vmax=5.0))
    sm._A = []
    cbar = plt.colorbar(sm, ax=ax, fraction=0.05, pad=0.03)
    cbar.set_label("Сила на феромона", fontsize=12)

    plt.title(f"Стъпка {step}", fontsize=14)
    plt.axis('off')
    plt.tight_layout()
    plt.savefig(filename)
    plt.close()

# ==== Основна симулация ====
os.makedirs("frames", exist_ok=True)
images = []

for step in range(n_steps):
    for edge in pheromones:
        pheromones[edge] *= decay

    ant_paths = [simulate_ant() for _ in range(n_ants)]

    max_path_len = max(len(p) for p in ant_paths)
    if max_path_len <= 1:
        max_path_len = 2

    for substep in range((max_path_len - 1) * steps_per_ant):
        ant_positions = []

        for path in ant_paths:
            edge_idx = substep // steps_per_ant
            t = (substep % steps_per_ant) / steps_per_ant

            if edge_idx < len(path) - 1:
                from_node = path[edge_idx]
                to_node = path[edge_idx + 1]
                pos = interpolate(positions[from_node], positions[to_node], t)
            else:
                pos = positions[path[-1]]

            ant_positions.append(pos)

        filename = f"frames/frame_{step:02d}_{substep:02d}.png"

        # На последния кадър – визуализирай най-добрия път
        if step == n_steps - 1 and substep == (max_path_len - 1) * steps_per_ant - 1:
            def path_score(path):
                total_pher = sum(pheromones.get((path[i], path[i+1]), 0) for i in range(len(path)-1))
                return total_pher / len(path)  # феромони на ръб / дължина

            candidate_paths = [simulate_ant() for _ in range(100)]
            best_path = max(candidate_paths, key=path_score)

            draw_graph(step, pheromones, ant_positions, filename, highlight_path=best_path)
        else:
            draw_graph(step, pheromones, ant_positions, filename)

        images.append(imageio.imread(filename))

    for path in ant_paths:
        for i in range(len(path) - 1):
            edge = (path[i], path[i+1])
            pheromones[edge] += pheromone_boost / len(path)

# ==== Създаване на GIF ====
imageio.mimsave("aco_ants-1.gif", images, duration=0.3)
