import { WorkspaceContent } from '../types';

export const sortWorkspaceContent = (files: WorkspaceContent[]) => {
  const folders = files.filter((file) => file.object_type === 'DIRECTORY');
  const notFolders = files.filter((file) => file.object_type !== 'DIRECTORY');

  return [
    ...folders.sort((a, b) => a.path.localeCompare(b.path)),
    ...notFolders.sort((a, b) => a.path.localeCompare(b.path)),
  ];
};
