function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(' ');
}

interface AppProps {
	text: string;
	setSolid: boolean;
}

export default function SimpleButton(props: AppProps) {
	return (
		<button
			type="button"
			className={classNames(
				props.setSolid
					? 'inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-cream-light bg-coffee-light hover:bg-accent-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-light'
					: 'inline-flex items-center px-4 py-2 border-2 border-coffee-light shadow-sm text-sm font-medium rounded-md text-gray-700 bg-cream-light hover:border-accent-light hover:text-accent-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-light'
			)}
		>
			{props.text}
		</button>
	);
}
