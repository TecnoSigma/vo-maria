# DOCUMENTAÇÃO TÉCNICA

## ÍNDICE

- [Templates](#templates)
  - [Miçangas](#miçangas)
    - [Canjicão](#canjicão)
    - [Canjicão Cristal](#canjicão-cristal)
    - [Rajadão](#rajadão)
    - [Rajado](#rajado)
    - [Miçanguinha](#miçanguinha)

## TEMPLATES

Abaixo seguem os trechos do código das tmaplates SVG que devem ser dinâmicos:

### Miçangas

#### Canjição

```svg
<stop style="stop-color:#000000; stop-opacity:1" offset="1"/>
```

#### Canjicão Cristal

```svg
<stop style="stop-color:#000000;stop-opacity:0.5" offset="1" />
```

### Rajadão

```svg
<!-- center -->
<stop style="stop-color:#ff0000;stop-opacity:1;" offset="0" />
<stop style="stop-color:#ff0000;stop-opacity:1;" offset="0" />

<!-- sides -->
<stop style="stop-color:#000000;stop-opacity:1" offset="1" />
```

### Rajado

```svg
<!-- center -->
<stop style="stop-color:#ff0000;stop-opacity:1;" offset="0" />
<stop style="stop-color:#ff0000;stop-opacity:0;"  offset="1" />

<!-- sides -->
<stop style="stop-color:#000000;stop-opacity:1" offset="1" />
```

### Miçanguinha

```svg
<stop style="stop-color:#000000; stop-opacity:1" offset="1"/>
```
