import { FlatTreeControl } from '@angular/cdk/tree';
import { HttpClient } from '@angular/common/http';
import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
  MatTreeModule,
} from '@angular/material/tree';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { WorkspaceContent } from '../../types';
import { sortWorkspaceContent } from '../../utils/workspaces';

type Node = {
  item: WorkspaceContent;
  children: Node[];
};

interface ExampleFlatNode {
  expandable: boolean;
  item: WorkspaceContent;
  level: number;
}

@Component({
  selector: 'app-notebook-picker',
  standalone: true,
  imports: [MatTreeModule, MatButtonModule, MatIconModule],
  templateUrl: './notebook-picker.component.html',
  styleUrl: './notebook-picker.component.scss',
})
export class NotebookPickerComponent {
  @Input() startPath = '/';
  loading = false;
  content: WorkspaceContent[] = [];
  http = inject(HttpClient);
  allContent: Record<string, Node> = {};
  visited: Record<string, boolean> = {};

  private _transformer = (node: Node, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      item: node.item,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    (node) => node.level,
    (node) => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  ngOnInit() {
    this.allContent[this.startPath] = {
      item: {
        path: this.startPath,
        created_at: 0,
        modified_at: 0,
        object_id: 0,
        resource_id: '0',
        object_type: 'DIRECTORY',
      },
      children: [],
    };
    this.util(this.allContent[this.startPath]);
    // this.loadDirectoryContent();
  }

  getTheLastName = (path: string) => {
    const temp = path.split('/');
    return temp[temp.length - 1];
  };

  async util(currNode: Node) {
    if (currNode.item.object_type !== 'DIRECTORY') {
      return;
    }

    if (this.visited[currNode.item.path]) {
      return;
    }

    try {
      console.log(`req: ${currNode.item.path}`);
      const req = this.http.get<{ objects: WorkspaceContent[] }>(
        `${environment.backendUrl}/workspaces`,
        {
          params: {
            path: currNode.item.path,
          },
        },
      );
      const resp = await firstValueFrom(req);
      this.visited['/'] = true;
      if (resp.objects) {
        const objects = sortWorkspaceContent(resp.objects);
        for (const file of objects) {
          const temp: Node = { item: file, children: [] };
          currNode.children.push(temp);
          if (temp.item.object_type === 'DIRECTORY') {
            await this.util(temp);
          }
        }
        this.dataSource.data = this.allContent[this.startPath].children;
      }
    } catch (e) {
      console.error(e);
    }
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
}
