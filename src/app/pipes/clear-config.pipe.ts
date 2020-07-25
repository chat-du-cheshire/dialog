import { Pipe, PipeTransform } from '@angular/core';
import { DialogConfig } from '@ngneat/dialog';

@Pipe({
  name: 'clearConfig'
})
export class ClearConfigPipe implements PipeTransform {
  transform(config: DialogConfig): Partial<DialogConfig> {
    return Object.keys(config).reduce((acc, key) => {
      acc[key] = config[key] === '' ? undefined : config[key];

      return acc;
    }, {});
  }
}
