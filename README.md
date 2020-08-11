# Reusable Gameloop Package

Provides a lean, typed, and testable gameloop for use in browsers and node environments. This is implementation follows the famed 'fix-your-timestep' pattern popularized by Gaffer on Games. All you need to do is provide a frame driver (such as `window.requestAnimationFrame`) and implementations for for the following gameloop events:

- `integrate`: Apply physics or motion rules.
- `interpolate`: Account for leftover accumulator time.
- `reconcile`: Check for collisions or other actionable world states.
- `processInputs`: Apply user actions to the world state.
- `render`: Draw to the screen.
