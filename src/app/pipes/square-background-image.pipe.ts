import { Pipe, PipeTransform } from '@angular/core';
import { Square } from '../models/piece';

@Pipe({
	name: 'squareBackgroundImage'
})
export class SquareBackgroundImagePipe implements PipeTransform {

	transform(value: Square): string | undefined {
		if (value.color === undefined || value.type === undefined) return undefined;
		return `url(/assets/${value.color}-${value.type}.png)`;
	}

}
