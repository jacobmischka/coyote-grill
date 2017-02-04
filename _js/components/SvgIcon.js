import { h } from 'preact';

const SvgIcon = ({ src, style }) => (
	<span className="svg-icon" style={style}
			dangerouslySetInnerHTML={{__html: src}}>
		<style jsx global>
		{`
			.svg-icon {
				display: inline-block;
			}

			.svg-icon svg {
				height: 100%;
				width: 100%;
			}
		`}
		</style>
	</span>
);

SvgIcon.propTypes = {
	src: String,
	style: Object
};

export default SvgIcon;
