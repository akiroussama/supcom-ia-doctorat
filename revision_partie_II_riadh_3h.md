# Revision Partie II - M. Riadh Abdelfattah

Objectif: viser au moins 6/10 avec efficience. On ne cherche pas a
reciter toutes les formules du cours. On cherche a savoir resoudre les
questions typiques qui tombent dans les devoirs.

Sources regardees:

- `ExamenIA-Doctoral2021NovFinal.pdf`
- `ExamenIA-Doctoral2023-Mai2023.pdf`
- `IA-ClassificationSuperviseeJanvier2026FinalAvril.pdf`
- `IA-ClassificationNonSuperviseeChapitreV-Avril2026Final.pdf`
- `index.html`
- `index-non-supervisee.html`

## 1. Diagnostic depuis les examens

Ce qui tombe vraiment:

| Theme | 2021 | 2023 | Priorite |
|---|---:|---:|---|
| SVM | Probleme 6 pts + QCM | Probleme 6 pts | Tres haute |
| CAH / clustering hierarchique | Probleme 8 pts | - | Haute |
| ACP | - | Probleme 6 pts | Haute |
| Inertie / barycentre / Huygens | Lie au clustering | Probleme 4 pts | Haute |
| Matrice de confusion / sensibilite / specificite | QCM Bayes/COVID | Probleme 4 pts | Haute |
| KNN | QCM numerique | Quiz cours | Moyenne |
| Bayes / odds / cote | QCM | possible | Moyenne |
| K-means | cours, non tombe directement | possible | Moyenne |

Conclusion: pour securiser 6/10, il faut maitriser les procedures, pas
les demonstrations:

1. SVM: trouver ou utiliser un hyperplan, classer un nouveau point.
2. Non supervise: CAH, ACP, barycentre, inerties.
3. Evaluation: matrice de confusion, sensibilite, specificite.
4. QCM: KNN, overfitting, dual SVM, Bayes, non-parametrique.

## 2. Strategie minimum 6/10

Ordre de priorite:

1. SVM: il est tombe dans les deux examens. Ne pas l'impasser.
2. Un gros bloc non supervise: CAH ou ACP/inerties.
3. Matrice de confusion: facile, rentable, peu de maths.
4. QCM rapides: definitions et pieges.

Ce qu'on peut ignorer en premiere passe:

- demonstrations mathematiques longues;
- derivation complete du dual SVM;
- details de tous les noyaux;
- formalisme probabiliste avance des modeles de melange;
- slides illustratives redondantes.

## 3. SVM - recette examen

Idee a retenir:

- SVM cherche l'hyperplan qui separe deux classes avec la plus grande marge.
- La decision se fait avec le signe de `f(x) = w.x + b`.
- Si `f(x) > 0`, classe `+1`; si `f(x) < 0`, classe `-1`.
- Les vecteurs supports sont les points les plus proches de la frontiere.
- En forme canonique: les vecteurs supports verifient `y_i(w.x_i + b) = 1`.
- Les deux marges sont `w.x + b = +1` et `w.x + b = -1`.
- L'hyperplan de separation est `w.x + b = 0`.

Forme duale a connaitre sans demonstration:

- `w = somme(alpha_i y_i x_i)`.
- Les `alpha_i` non nuls correspondent aux vecteurs supports.
- Le dual permet le kernel trick: remplacer les produits scalaires par un noyau
  pour traiter les cas non lineaires.

Hard margin vs soft margin:

- Hard margin: donnees separables, aucune erreur toleree.
- Soft margin: donnees non parfaitement separables, variables de relachement,
  parametre `C`.
- Grand `C`: on penalise fort les erreurs, marge plus stricte.
- Petit `C`: on accepte plus d'erreurs, marge plus large, meilleure regularisation.

### Exemple type 2023

Donnees:

| Point | Att1 | Att2 | y |
|---|---:|---:|---:|
| X1 | -3 | 1 | -1 |
| X2 | 3 | 0 | +1 |
| X3 | 1 | -3 | -1 |
| X4 | 0 | 3 | +1 |

On donne:

- `alpha1 = 1/9`
- `alpha2 = 1/3`
- `alpha3 = 1/3`
- `alpha4 = 1/27`
- `b = -1/2`

Calcul:

`w = somme(alpha_i y_i x_i)`

Donc:

- contribution X1: `(1/9)(-1)(-3,1) = (1/3, -1/9)`
- contribution X2: `(1/3)(+1)(3,0) = (1,0)`
- contribution X3: `(1/3)(-1)(1,-3) = (-1/3,1)`
- contribution X4: `(1/27)(+1)(0,3) = (0,1/9)`

Somme:

`w = (1,1)`

Hyperplan:

`x1 + x2 - 1/2 = 0`

Nouveau point `X5 = (2,0)`:

`f(X5) = 2 + 0 - 1/2 = 1.5 > 0`

Donc `X5` est classe `+1`.

Type de SVM: SVM lineaire binaire. Si on utilise une marge sans erreur sur ce
jeu, c'est l'idee du hard margin.

### Exemple type 2021

Points:

| Point | Att1 | Att2 | y |
|---|---:|---:|---:|
| X1 | 4 | 3 | +1 |
| X2 | 0 | 2 | +1 |
| X3 | 0 | 0 | -1 |

La separation optimale intuitive est horizontale:

`x2 - 1 = 0`

Donc:

- `w = (0,1)`
- `b = -1`
- X2 et X3 sont sur les marges.
- X1 est bien du cote positif.

Avec `w = somme(alpha_i y_i x_i)`:

- `alpha1 = 0`
- `alpha2 = 1/2`
- `alpha3 = 1/2`

## 4. KNN - recette examen

Idee:

- Pas d'entrainement lourd.
- On garde les donnees.
- Pour classer un nouveau point: calculer les distances, trier, prendre les `K`
  plus proches, voter.

Pieges:

- KNN est non parametrique.
- Sensible a l'echelle des variables: normaliser si les variables n'ont pas la
  meme unite.
- K petit: sensible au bruit.
- K grand: decision trop lisse.
- En haute dimension, les distances deviennent moins informatives.

### Exemple QCM 2021

Nouveau point: `(0,1)`, `K=3`.

Les trois plus proches sont:

1. E3 `(-1,0)` classe `-`
2. E6 `(1,0)` classe `+`
3. E7 `(2,1)` classe `+`

Vote: deux `+` contre un `-`.

Classe predite: `+`.

## 5. CAH - recette examen

CAH = classification ascendante hierarchique.

Procedure:

1. Chaque point commence seul dans son cluster.
2. Calculer les distances entre clusters.
3. Fusionner les deux clusters les plus proches.
4. Recalculer les distances.
5. Continuer jusqu'a un seul cluster.
6. Dessiner le dendrogramme avec les hauteurs de fusion.

Deux distances importantes:

- Saut minimum / single linkage: distance entre deux clusters =
  plus petite distance entre deux points des deux clusters.
- Voisin le plus eloigne / complete linkage: distance entre deux clusters =
  plus grande distance entre deux points des deux clusters.

Interpretation:

- Single linkage peut produire un effet chaine: clusters allonges.
- Complete linkage produit des clusters plus compacts.

### Exemple CAH 2021

Points:

| Point | X1 | X2 |
|---|---:|---:|
| E1 | -2 | 3 |
| E2 | -2 | 1 |
| E3 | -2 | -1 |
| E4 | 2 | -1 |
| E5 | 2 | 1 |

Distances utiles:

- `d(E1,E2)=2`
- `d(E2,E3)=2`
- `d(E4,E5)=2`
- `d(E2,E5)=4`
- `d(E3,E4)=4`
- `d(E1,E4)=sqrt(32)=5.657`

Single linkage:

1. Fusion `E1,E2` a hauteur `2`.
2. Fusion `{E1,E2}` avec `E3` a hauteur `2`.
3. Fusion `E4,E5` a hauteur `2`.
4. Fusion finale `{E1,E2,E3}` avec `{E4,E5}` a hauteur `4`.

Complete linkage:

1. Fusion `E1,E2` a hauteur `2`.
2. Fusion `E4,E5` a hauteur `2`.
3. Fusion `{E1,E2}` avec `E3` a hauteur `4`.
4. Fusion finale `{E1,E2,E3}` avec `{E4,E5}` a hauteur `sqrt(32)=5.657`.

Phrase d'interpretation prete a utiliser:

Le saut minimum fusionne plus facilement des groupes des qu'un seul couple de
points est proche; il peut creer un effet chaine. Le voisin le plus eloigne
exige que tous les points des deux groupes restent proches; il donne donc des
groupes plus compacts et une fusion finale plus haute.

## 6. K-means - recette examen

Procedure:

1. Choisir `K` centres initiaux.
2. Affecter chaque point au centre le plus proche.
3. Recalculer chaque centre comme barycentre du cluster.
4. Recommencer jusqu'a stabilisation.

A retenir:

- K-means minimise l'inertie intra-classe.
- Rapide et simple.
- Il faut fixer `K` avant.
- Sensible a l'initialisation.
- Bon pour clusters compacts, moins bon pour formes complexes.

## 7. Barycentre, inerties, Huygens

Definitions pratiques:

- Barycentre global `G`: moyenne de tous les points.
- Barycentre d'une classe `G_k`: moyenne des points de cette classe.
- Inertie totale `I_T`: dispersion de tous les points autour de `G`.
- Inertie intra-classe `I_W`: dispersion des points autour de leur barycentre
  de classe.
- Inertie inter-classe `I_B`: dispersion des barycentres de classes autour de
  `G`.

Theoreme de Huygens:

`I_T = I_W + I_B`

Interpretation:

- Bon clustering: faible inertie intra-classe, forte inertie inter-classe.
- Les points sont proches dans chaque groupe, et les groupes sont eloignes entre
  eux.

### Exemple 2023

Points de l'exercice SVM:

| Point | x1 | x2 | y |
|---|---:|---:|---:|
| X1 | -3 | 1 | -1 |
| X2 | 3 | 0 | +1 |
| X3 | 1 | -3 | -1 |
| X4 | 0 | 3 | +1 |

Barycentre global:

`G = (0.25, 0.25)`

Barycentres par classe:

- Classe `-1`: `G_- = (-1,-1)`
- Classe `+1`: `G_+ = (1.5,1.5)`

Avec la convention "somme des distances au carre":

- `I_T = 37.5`
- `I_W = 25`
- `I_B = 12.5`

Verification:

`37.5 = 25 + 12.5`

Donc Huygens est verifie.

## 8. ACP - recette examen

ACP = analyse en composantes principales.

Objectif:

- reduire la dimension;
- garder le maximum d'information;
- projeter les donnees sur des axes qui capturent le plus de variance.

Procedure:

1. Centrer les donnees: retirer la moyenne de chaque variable.
2. Calculer la matrice de covariance.
3. Calculer les valeurs propres et vecteurs propres.
4. Trier les valeurs propres de la plus grande a la plus petite.
5. Calculer le pourcentage de variance expliquee.
6. Garder les premieres composantes qui expliquent assez de variance.

A retenir:

- Grande valeur propre = axe important.
- Vecteur propre = direction de l'axe principal.
- Pourcentage explique par composante:
  `lambda_i / somme(lambda_j)`.
- Si la premiere composante explique presque tout, on garde 1 composante.

### Exemple ACP 2023

Points:

| E | X1 | X2 |
|---|---:|---:|
| E1 | 1 | 2 |
| E2 | 2 | 3 |
| E3 | 3 | 4 |

Les deux variables sont parfaitement correlees: `X2 = X1 + 1`.

Apres centrage:

- E1: `(-1,-1)`
- E2: `(0,0)`
- E3: `(1,1)`

Si on divise par `n`, covariance:

```
[[2/3, 2/3],
 [2/3, 2/3]]
```

Valeurs propres:

- `lambda1 = 4/3`
- `lambda2 = 0`

Variance expliquee:

- CP1: `100%`
- CP2: `0%`

Conclusion:

On garde une seule composante principale. La premiere composante represente le
niveau global des deux variables. La deuxieme n'apporte rien ici, car les deux
variables portent la meme information.

Scores:

- E1: negatif sur CP1
- E2: centre
- E3: positif sur CP1

## 9. Evaluation: matrice de confusion

Definitions:

- Sensibilite = capacite a detecter les malades.
  `Sensibilite = TP / (TP + FN)`.
- Specificite = capacite a reconnaitre les non-malades.
  `Specificite = TN / (TN + FP)`.
- Faux positif: personne saine testee positive.
- Faux negatif: personne malade testee negative.

### Exemple 2023

Total: `1000` personnes.

- Malades: `100`
- Non malades: `900`
- Sensibilite: `95%`
- Specificite: `90%`

Calcul:

- `TP = 95% de 100 = 95`
- `FN = 5`
- `TN = 90% de 900 = 810`
- `FP = 90`

Matrice:

| Reel / Test | Test positif | Test negatif |
|---|---:|---:|
| Malade | TP = 95 | FN = 5 |
| Non malade | FP = 90 | TN = 810 |

Interpretation:

- 90 faux positifs: personnes saines annoncees positives.
- 810 vrais negatifs: personnes saines correctement annoncees negatives.
- Meme avec un bon test, si la maladie est rare, beaucoup de positifs peuvent
  etre faux positifs.

## 10. Bayes et cotes

Ne pas paniquer avec Bayes: souvent le prof demande une lecture simple.

Formule de cote:

`cote(A) = P(A) / P(non A)`

Exemple QCM 2021:

- Probabilite malade = `20%`
- Probabilite non malade = `80%`

Cote pour ne pas etre malade:

`0.8 / 0.2 = 4`

Donc cote: `4 contre 1`.

Pour le classifieur Bayes naif:

- on combine les probabilites conditionnelles;
- hypothese naive: les variables sont supposees independantes conditionnellement
  a la classe;
- cette hypothese est souvent fausse mais marche bien en pratique.

## 11. QCM: reponses rapides a memoriser

Non parametrique:

- KNN: oui.
- CAH: oui dans l'esprit du cours, car methode exploratoire sans modele
  statistique.
- Bayes naif: non, modele probabiliste.
- SVM: a traiter comme non prioritaire pour cette question; dans ce cours, le
  piege attendu est surtout KNN/CAH.

Overfitting:

- Frontiere trop complexe qui suit trop les points d'apprentissage.
- Erreur train faible, erreur test forte.

Dual SVM:

- avantage cle: permet le kernel trick, donc les frontieres non lineaires.
- les vecteurs supports sont ceux avec `alpha_i > 0`.

Modele de melange:

- la variable cachee n'est pas l'observation `X`;
- la variable cachee est le cluster/la classe latente.

Classification vs regression:

- classification: sortie discrete, classe.
- regression: sortie continue, valeur numerique.

Supervise vs non supervise:

- supervise: donnees avec labels.
- non supervise: pas de labels, on cherche une structure.

## 12. Plan de revision 3 heures

### 0:00 - 0:15: cadrage

Lire uniquement le diagnostic ci-dessus. Objectif: savoir ce qui est rentable.

Livrable mental:

- SVM tombe presque toujours.
- Non supervise tombe sous forme CAH/ACP/inerties.
- Evaluation est facile et rentable.

### 0:15 - 1:00: SVM

Faire:

1. Lire la recette SVM.
2. Refaire l'exemple 2023 jusqu'a obtenir `w=(1,1)`.
3. Refaire l'exemple 2021 jusqu'a obtenir `x2 - 1 = 0`.
4. Savoir classer un nouveau point avec le signe de `w.x+b`.

Minimum a retenir:

`decision = signe(w.x+b)`, `w = somme(alpha_i y_i x_i)`, dual = noyaux.

### 1:00 - 1:45: CAH + KNN

Faire:

1. Refaire les fusions CAH 2021.
2. Comprendre difference single linkage / complete linkage.
3. Refaire le KNN du QCM 2021.

Minimum a retenir:

CAH = fusionner progressivement, dendrogramme. KNN = distances + vote.

### 1:45 - 2:25: ACP + inerties

Faire:

1. Refaire l'ACP 2023.
2. Retenir que variables parfaitement correlees => une composante suffit.
3. Refaire les inerties 2023 et Huygens.

Minimum a retenir:

ACP = covariance -> valeurs propres -> variance expliquee.

### 2:25 - 2:45: matrice de confusion + Bayes

Faire:

1. Refaire le depistage COVID 2023.
2. Refaire la cote COVID 2021.

Minimum a retenir:

Sensibilite detecte les malades. Specificite reconnait les non-malades.

### 2:45 - 3:00: QCM express

Se tester oralement:

1. KNN parametrique ou non parametrique?
2. SVM maximise quoi?
3. Quel est l'avantage du dual SVM?
4. Difference hard margin / soft margin?
5. CAH single vs complete linkage?
6. ACP: que signifie une grande valeur propre?
7. Huygens: quelle relation?
8. Sensibilite vs specificite?
9. Overfitting: comment le reconnaitre?

## 13. Reponse-type en examen

Quand on ne sait pas tout, ecrire proprement la procedure:

1. Je pose les donnees dans un tableau.
2. Je calcule les distances ou le score demande.
3. Je donne la decision.
4. Je donne une phrase d'interpretation.

Exemple de phrase qui rapporte des points:

> Le resultat montre que l'inertie intra-classe est faible par rapport a
> l'inertie inter-classe; les groupes sont donc relativement compacts et bien
> separes.

Autre phrase utile:

> La premiere composante principale explique presque toute la variance; garder
> une seule composante est donc suffisant pour reduire la dimension avec une
> perte d'information faible.

Autre phrase utile:

> Le classifieur SVM classe le nouveau point selon le signe de la fonction de
> decision. Comme le score est positif, le point appartient a la classe +1.

