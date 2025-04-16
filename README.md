# React Spin Carousel 3D 🎠

![Carousel Demo]("https://raw.githubusercontent.com/SpurgeonPrakash/images-for-carousel-ui/main/carousel-ui-react-spin-carousel-3d") _Replace with your actual demo GIF_

The **React Spin Carousel 3D** is a highly customizable 3D carousel component for React. It allows you to display a collection of items in a visually appealing 3D carousel with smooth transitions and interactive controls. The component supports auto-play, custom radio buttons, smooth animations and multiple display modes("card", "image"). Perfect for showcasing portfolios, products, or image galleries and many more :).

## 📦 Installation

```bash
npm install @carousel-ui/react-spin-carousel-3d
# or
yarn add @carousel-ui/react-spin-carousel-3d
```

## 🌟 Features

- **3D Perspective Effects** - Realistic card rotation and depth
- **Dual Display Modes** - `card` (with shadows/borders) and `image` (seamless) modes
- **Responsive Design** - Works on all screen sizes
- **Touch & Drag Support** - Mobile-friendly interactions
- **Auto-play** - Optional automatic rotation
- **Customizable Navigation** - Built-in radio buttons or bring your own
- **TypeScript Support** - Fully typed components
- **Performance Optimized** - Smooth animations with CSS transforms

## Usage

Complete usage [Examples](https://github.com/react-carousel/react-spin-carousel-3d/blob/main/USAGE.md)

## 🛠 Props Reference

### Core Props

| Prop         | Type                                          | Default      | Description                   |
| ------------ | --------------------------------------------- | ------------ | ----------------------------- |
| `data`       | `T[]`                                         | **Required** | Array of items to render      |
| `renderItem` | `(item: T, index: number) => React.ReactNode` | **Required** | Render function for each item |

### Layout & Styling

| Prop              | Type                  | Default               | Description                        |
| ----------------- | --------------------- | --------------------- | ---------------------------------- |
| `width`           | `string \| number`    | `"100vw"`             | Container width (px or %)          |
| `height`          | `string \| number`    | `300`                 | Container height (px or %)         |
| `itemWidth`       | `string \| number`    | `300`                 | Individual item width (px or %)    |
| `accentColor`     | `string`              | `"hsl(204, 5%, 38%)"` | Color for active states            |
| `backgroundColor` | `string`              | `"#F5F5F5"`           | Background color for card mode     |
| `containerStyle`  | `React.CSSProperties` | `{}`                  | Custom styles for container div    |
| `itemStyle`       | `React.CSSProperties` | `{}`                  | Custom styles for individual items |

### Behavior & Functionality

| Prop                 | Type                               | Default      | Description                       |
| -------------------- | ---------------------------------- | ------------ | --------------------------------- |
| `initialActiveIndex` | `number`                           | Middle index | Starting active item index        |
| `isAutoPlay`         | `boolean`                          | `false`      | Enable automatic rotation         |
| `autoPlayInterval`   | `number`                           | `5000`       | Rotation interval in milliseconds |
| `onItemClick`        | `(item: T, index: number) => void` | -            | Callback when item is clicked     |

### Display Mode

| Prop            | Type                             | Default    | Description                         |
| --------------- | -------------------------------- | ---------- | ----------------------------------- |
| `displayMode`   | `"image" \| "card"`              | `"card"`   | Visual presentation style           |
| `imageFit`      | `"cover" \| "contain" \| "fill"` | `"cover"`  | Image scaling behavior (image mode) |
| `imagePosition` | `string`                         | `"center"` | Image positioning (e.g. "top left") |

### Navigation Controls

| Prop                 | Type                                                   | Default | Description                        |
| -------------------- | ------------------------------------------------------ | ------- | ---------------------------------- |
| `showRadioButtons`   | `boolean`                                              | `true`  | Show default navigation indicators |
| `customRadioButtons` | `(index, isActive, setActiveIndex) => React.ReactNode` | -       | Custom navigation component        |
| `radioButtonStyle`   | `React.CSSProperties`                                  | `{}`    | Styles for default navigation dots |

### Advanced Configuration

| Prop  | Type     | Default | Description                    |
| ----- | -------- | ------- | ------------------------------ |
| `key` | `string` | -       | Unique identifier for carousel |

## 🎨 Styling Tips

1.  **For Cards**:

    - Use `backgroundColor` to set card color
    - Add custom shadows via `itemStyle`

    ```tsx
    itemStyle={{
      boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
      borderRadius: "12px"
    }}
    ```

2.  **For Images**:
    - Set `imageFit="contain"` for full image visibility
    - Use `imagePosition="top"` for portrait images

## ⚠️ Troubleshooting

**Issue**: Auto-play stops on hover  
**Solution**: This is intentional (UX best practice). Lets the user observe whats inside the card while hovering!

**Issue**: Radio buttons not properly working when using multiple carousels in same page  
**Solution**: Use unique key on each carousel

**Issue**: Horizontal scroll appears  
**Fix**: Ensure parent container has `overflow-x: hidden`

**Issue**: Items overlapping  
**Fix**: Increase `itemWidth` or reduce number of items

## 🤝 Contributing

Contributions, issues and feature requests are welcome!  
Feel free to check the [issues page](https://github.com/react-carousel/react-spin-carousel-3d/issues).

If you'd like to improve this project, please:

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a pull request

We appreciate all kinds of contributions — bug reports, feature ideas, code, and documentation!

Please add tests before submitting a PR!

## 📜 License

MIT © @carousel-ui
