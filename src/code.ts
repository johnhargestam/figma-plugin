figma.showUI(__html__);

figma.ui.onmessage = (msg: any): void => {
  if (msg.type === 'create-rectangles') {
    const nodes: RectangleNode[] = [];

    for (let i: number = 0; i < msg.count; i += 1) {
      const rect: RectangleNode = figma.createRectangle();
      rect.x = i * 150;
      rect.fills = [{ type: 'SOLID', color: { r: 1, g: 0.5, b: 0 } }];
      figma.currentPage.appendChild(rect);
      nodes.push(rect);
    }

    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);
  }

  figma.closePlugin();
};
