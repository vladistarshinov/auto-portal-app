import cn from 'classnames';
import { forwardRef } from 'react';

import styles from './Field.module.scss';
import { IField } from './field.interface';

const Field = forwardRef<HTMLInputElement, IField>(
	({ placeholder, error, type = 'text', style, ...rest }, ref) => {
		return (
			<div className={cn(styles.common, styles.field)} style={style}>
				<label>
					<span>{placeholder}</span>
					<input ref={ref} type={type} {...rest} />
				</label>
				{error && <div className={styles.error}>{error.message}</div>}
			</div>
		);
	}
);

Field.displayName = 'Field';

export default Field;