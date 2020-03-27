import React, { Fragment } from "react";
import {
	PanelBody,
	ColorPalette,
	RangeControl,
	SelectControl,
	DropdownMenu,
	MenuGroup,
	MenuItem,
	Toolbar,
	Tooltip,
	Button
} from "@wordpress/components";
import { basicColorScheme, strip_tags, firstCapital } from "../../block/misc/helper";
import { clone, set, get } from "lodash";
import { getRootFormBlock, } from "../../block/functions/index";
const { RichText, InspectorControls, BlockControls } = wp.blockEditor;
const { __ } = wp.i18n;

function edit(props) {
	const {
		styling,
		styling: { backgroundColor, color, padding, borderRadius },
		label,
		action
	} = props.attributes;


	const buttonStyling = {
		...styling,
		padding: `${Math.floor(padding / 3)}px ${padding}px `,

	}


	const handleStyling = (style, key) => {
		const buttonStyling = clone(styling);

		set(buttonStyling, key, style); //changing the color;

		props.setAttributes({ styling: buttonStyling });
	};


	const handleAction = (newAction) => {
		props.setAttributes({ action: newAction });


		if (strip_tags(label).toLowerCase() === action) {
			props.setAttributes({ label: firstCapital(newAction) })
		}

	}

	React.useEffect(() => {
		props.setAttributes({ parentId: getRootFormBlock(props.clientId).clientId });
	});

	const getActions = () => {
		const rootForm = getRootFormBlock(props.clientId);
		const rootType = get(rootForm, 'attributes.formType'); //getting the type of form i.e multistep,standard;

		let actions = [
			{
				label: "Reset", value: "reset"
			},
			{
				label: "Submit", value: "submit"
			}
		];

		if (rootType === "multiStep") {
			actions.push(...[
				{
					label: "Next", value: "next"
				},
				{
					label: "Previous", value: "previous"
				}
			])
		}


		return actions;
	}

	let actionLabel = __(<span>Action</span>)

	return [

		<InspectorControls>
			<PanelBody title="Settings">
				<div className="cwp-option column">

					<h3>Action</h3>
					<div className="cwp-column">
						<SelectControl
							value={action}
							options={getActions()}
							onChange={(action) => handleAction(action)}
						/>
					</div>
				</div>
			</PanelBody>
			<PanelBody title="Colors">
				<div className="cwp-option">
					<h3 className="cwp-heading">Background Color</h3>
					<ColorPalette
						colors={basicColorScheme}
						value={backgroundColor}
						onChange={color => handleStyling(color, "backgroundColor")}
					/>
				</div>
				<div className="cwp-option">
					<h3 className="cwp-heading">Color</h3>
					<ColorPalette
						colors={basicColorScheme}
						value={color}
						onChange={color => handleStyling(color, "color")}
					/>
				</div>
				<div className="cwp-option">
					<RangeControl
						min={0}
						max={100}
						label="Padding"
						value={padding}
						onChange={p => handleStyling(p, "padding")}
					/>
				</div>
				<div className="cwp-option">
					<RangeControl
						min={0}
						max={100}
						label="Border Radius"
						value={borderRadius}
						onChange={p => handleStyling(p, "borderRadius")}
					/>
				</div>
			</PanelBody>
		</InspectorControls>,
		<BlockControls>
			<Toolbar>
				<DropdownMenu label="Select Action" menuLabel="Action" icon={actionLabel}>
					{
						() => (
							<Fragment>
								<MenuGroup>
									{
										getActions().map(a => {

											let activeIcon = action === a.value ? 'yes' : 'no';

											return <MenuItem type="radio" role="menuitemradio" isSelected={action === a.value} icon={activeIcon} onClick={() => handleAction(a.value)}>{a.label}</MenuItem>

										})
									}
								</MenuGroup>
							</Fragment>
						)
					}
				</DropdownMenu>
			</Toolbar>
		</BlockControls >, ,
		<button style={buttonStyling} className={props.className}>
			<RichText
				tag="span"
				value={label}
				onChange={label => props.setAttributes({ label })}
			/>
		</button>
	];
}

export default edit;
