import { visit } from 'unist-util-visit';

// Map of markers to types
const typeMap = {
  TIP: 'tip',
  WARNING: 'warning',
  ERROR: 'error',
  SUCCESS: 'success',
  INFO: 'info'
};

/**
 * Transform GitHub style blockquote admonitions:
 * > [!TIP]\n> content
 * into JSX <Admonition type="tip">content</Admonition>
 */
export default function remarkAdmonitionBlocks() {
  return (tree) => {
    let injected = false;
    visit(tree, 'blockquote', (node, index, parent) => {
      if (!parent || !node.children || node.children.length === 0) return;
      const first = node.children[0];
      if (first.type !== 'paragraph' || !first.children || first.children.length === 0) return;
      const text = first.children.map(c => c.value || '').join('').trim();
      // Match [!TYPE] prefix
      const match = text.match(/^\[!(TIP|WARNING|ERROR|SUCCESS|INFO)]/);
      if (!match) return;
      const rawType = match[1];
      const type = typeMap[rawType] || 'info';
      // Remove the marker from first paragraph text
      first.children = first.children.reduce((acc, child) => {
        if (child.type === 'text') {
          const replaced = child.value.replace(/^\[!(TIP|WARNING|ERROR|SUCCESS|INFO)]\s*/, '');
          if (replaced.length > 0) acc.push({ ...child, value: replaced });
        } else acc.push(child);
        return acc;
      }, []);
      // Convert entire blockquote to JSX element
      injected = true;
      parent.children[index] = {
        type: 'mdxJsxFlowElement',
        name: 'Admonition',
        attributes: [
          { type: 'mdxJsxAttribute', name: 'type', value: type },
          { type: 'mdxJsxAttribute', name: 'title', value: rawType === rawType.toUpperCase() ? undefined : undefined }
        ],
        children: node.children
      };
    });
    if (injected) {
      // Check if import already exists
      const hasImport = tree.children.some(n => n.type === 'import' && /Admonition/.test(n.value || ''));
      if (!hasImport) {
        tree.children.unshift({ type: 'import', value: "import Admonition from '../../components/Admonition.astro';" });
      }
    }
  };
}
