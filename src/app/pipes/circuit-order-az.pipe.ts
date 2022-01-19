import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'circuitOrderAZ'
})
export class CircuitOrderAZPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
