import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    table: (props) => (
      <div className="overflow-x-auto">
        <table {...props} />
      </div>
    ),
  };
}
