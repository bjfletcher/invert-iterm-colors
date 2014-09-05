A script in `Node` to invert from dark to light or light to dark an `.itermcolors` settings file. This is useful for when the colors of the screen are inverted like mine. :)

# How to use?

For example, to invert `Hybrid.itermcolors`, which is in the `examples` folder:

```
$ cat examples/Hybrid.itermcolors | node invert-itermcolors.js > examples/Hybrid-light.itermcolors

$ open examples/Hybrid-light.itermcolors
```

# Issues?

Give me a shout. @bjfletcher :)