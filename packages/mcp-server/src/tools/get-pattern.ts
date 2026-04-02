import { getComponents } from '../data.js';

export const definition = {
  name: 'get_pattern',
  description: 'Get a composition pattern showing how to combine components for a common UI scenario.',
  inputSchema: {
    type: 'object' as const,
    properties: {
      name: { type: 'string', description: 'Pattern name (e.g. "form", "dialog", "card-list", "data-table", "feedback").' },
    },
    required: ['name'],
  },
};

interface Pattern {
  name: string;
  description: string;
  components: string[];
  example: string;
  guidance: string[];
}

function getPatterns(): Pattern[] {
  const components = getComponents();
  const has = (name: string) => !!components[name.toLowerCase()];

  const patterns: Pattern[] = [];

  if (has('FormControl') && has('Input') && has('Button')) {
    patterns.push({
      name: 'form',
      description: 'A standard form layout with labelled inputs and validation.',
      components: ['FormControl', 'Label', 'Input', 'Textarea', 'Select', 'Checkbox', 'Radio', 'Button'],
      example: `<form>
  <FormControl>
    <Label htmlFor="email">Email</Label>
    <Input id="email" type="email" />
  </FormControl>
  <FormControl>
    <Label htmlFor="message">Message</Label>
    <Textarea id="message" />
  </FormControl>
  <Button type="submit" variant="primary">Submit</Button>
</form>`,
      guidance: [
        'Always use FormControl to associate labels with inputs.',
        'Use aria-required and aria-invalid for validation states.',
        'Place the submit button outside FormControl elements.',
      ],
    });
  }

  if (has('Modal') && has('Button')) {
    patterns.push({
      name: 'dialog',
      description: 'A confirmation dialog with a trigger button.',
      components: ['Modal', 'ModalHeader', 'ModalBody', 'ModalFooter', 'Button'],
      example: `const [isOpen, setIsOpen] = useState(false);

<Button onClick={() => setIsOpen(true)}>Delete item</Button>
<Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="sm">
  <ModalHeader onClose={() => setIsOpen(false)}>Confirm deletion</ModalHeader>
  <ModalBody>This action cannot be undone.</ModalBody>
  <ModalFooter>
    <Button onClick={() => setIsOpen(false)}>Cancel</Button>
    <Button variant="danger" onClick={handleDelete}>Delete</Button>
  </ModalFooter>
</Modal>`,
      guidance: [
        'Always provide a close button in the header.',
        'Keep modal content focused on a single action.',
        'Use size="sm" for simple confirmations.',
      ],
    });
  }

  if (has('Card') && has('Badge')) {
    patterns.push({
      name: 'card-list',
      description: 'A grid of cards displaying a list of items.',
      components: ['Card', 'Badge', 'Heading', 'Paragraph', 'Button'],
      example: `<div style={{ display: 'grid', gap: 'var(--spacing-layout-gap)', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
  {items.map((item) => (
    <Card key={item.id}>
      <Heading level={3}>{item.title}</Heading>
      <Badge variant={item.status}>{item.status}</Badge>
      <Paragraph>{item.description}</Paragraph>
    </Card>
  ))}
</div>`,
      guidance: [
        'Use CSS Grid with auto-fill for responsive layouts.',
        'Use semantic heading levels inside cards.',
        'Keep card content scannable — title, status, one description line.',
      ],
    });
  }

  if (has('Table') && has('Pagination')) {
    patterns.push({
      name: 'data-table',
      description: 'A paginated data table with sortable columns.',
      components: ['Table', 'Pagination', 'Input', 'Select'],
      example: `<Input placeholder="Search..." onChange={handleSearch} />
<Table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Status</th>
      <th>Date</th>
    </tr>
  </thead>
  <tbody>
    {rows.map((row) => (
      <tr key={row.id}>
        <td>{row.name}</td>
        <td><Badge>{row.status}</Badge></td>
        <td>{row.date}</td>
      </tr>
    ))}
  </tbody>
</Table>
<Pagination totalPages={totalPages} currentPage={page} onChange={setPage} />`,
      guidance: [
        'Place search/filter controls above the table.',
        'Place pagination below the table.',
        'Use Badge for status columns.',
      ],
    });
  }

  if (has('Alert') && has('Toast')) {
    patterns.push({
      name: 'feedback',
      description: 'Inline and transient feedback patterns.',
      components: ['Alert', 'Toast', 'ToastProvider', 'Spinner', 'ProgressBar'],
      example: `// Inline feedback
<Alert variant="danger" title="Upload failed" description="File size exceeds 5 MB." onClose={dismiss} />

// Transient feedback
const { toast } = useToast();
toast({ title: 'Saved', variant: 'success', duration: 3000 });

// Loading state
<Spinner aria-label="Loading results" />`,
      guidance: [
        'Use Alert for persistent, inline messages.',
        'Use Toast for transient confirmations.',
        'Use Spinner for indeterminate loading; ProgressBar for determinate.',
      ],
    });
  }

  return patterns;
}

export function handler({ name }: { name: string }): object {
  const patterns = getPatterns();
  const key = name.toLowerCase();
  const pattern = patterns.find((p) => p.name === key);

  if (pattern) {
    return pattern;
  }

  return {
    error: `Pattern "${name}" not found.`,
    available: patterns.map((p) => ({ name: p.name, description: p.description })),
  };
}
