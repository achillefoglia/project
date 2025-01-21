export interface RegistryComponent {
  name: string;
  type: string;
  registryDependencies: string[];
  files: {
    path: string;
    type: string;
  }[];
  tags: string[];
}

export interface Registry extends Array<RegistryComponent> {}

export const components: Registry = [
  {
    name: "button-group",
    type: "registry:component",
    registryDependencies: [],
    files: [
      {
        path: "components/ui/button-group/button-group.tsx",
        type: "registry:component",
      }
    ],
    tags: ["UI", "Form", "Layout"],
  },
  {
    name: "data-table",
    type: "registry:component",
    registryDependencies: [],
    files: [
      {
        path: "components/ui/data-table/data-table.tsx",
        type: "registry:component",
      }
    ],
    tags: ["UI", "Data Display", "Table"],
  },
  {
    name: "file-upload",
    type: "registry:component",
    registryDependencies: [],
    files: [
      {
        path: "components/ui/file-upload/file-upload.tsx",
        type: "registry:component",
      }
    ],
    tags: ["UI", "Form", "Input"],
  },
  {
    name: "image-gallery",
    type: "registry:component",
    registryDependencies: [],
    files: [
      {
        path: "components/ui/image-gallery/image-gallery.tsx",
        type: "registry:component",
      }
    ],
    tags: ["UI", "Data Display", "Media"],
  },
  {
    name: "rating",
    type: "registry:component",
    registryDependencies: [],
    files: [
      {
        path: "components/ui/rating/rating.tsx",
        type: "registry:component",
      }
    ],
    tags: ["UI", "Form", "Input", "Feedback"],
  }
];

// Pre-compute all available tags
const ALL_TAGS = Array.from(
  new Set(
    components.flatMap(component => component.tags)
  )
).sort();

export const getAllTags = () => ALL_TAGS;

export const getComponents = (page: number, selectedTags: string[]) => {
  const pageSize = 50;
  const filteredComponents = selectedTags.length
    ? components.filter((component) =>
        selectedTags.every((tag) => component.tags.includes(tag))
      )
    : components;

  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const hasMore = end < filteredComponents.length;

  return {
    components: filteredComponents.slice(start, end),
    hasMore,
    total: filteredComponents.length,
  };
};