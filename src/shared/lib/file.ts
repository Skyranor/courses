export function selectFile(
  contentType: string,
  multiple: true,
): Promise<File[]>;
export function selectFile(contentType: string): Promise<File>;

export function selectFile(contentType: string, multiple?: boolean) {
  return new Promise((resolve) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = contentType;
    input.multiple = multiple ?? false;

    input.onchange = () => {
      const files = Array.from(input.files as Iterable<File>);
      if (multiple) resolve(files);
      else resolve(files[0]);
    };

    input.click();
  });
}

export function validateFileSize(file: File, maxSize: number) {
  return file.size <= maxSize;
}
