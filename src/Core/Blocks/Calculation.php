<?php
namespace GutenbergForms\Core\Blocks;

defined( 'ABSPATH' ) || exit;

/**
 * Calculation block.
 *
 * @since 2.9.9.1
 */
class Calculation extends FieldBlock {
	private const NAME = 'cwp/form-calculation';

	/**
	 * Returns a block name.
	 *
	 * @since 2.9.9.1
	 *
	 * @return string
	 */
	public static function get_name(): string {
		return self::NAME;
	}

	/**
	 * Renders a block.
	 *
	 * @since 2.9.9.1
	 *
	 * @param array $attributes Block attributes.
	 *
	 * @return string
	 */
	public function render( array $attributes ): string {
		// Attributes that always exist.

		$id = $attributes['id'];

		// Stable attributes.

		$label = $attributes['label'] ?? '';

		// Custom attributes.

		$calculation    = $attributes['calculation'] ?? 0;
		$decimal_places = $attributes['decimalPlaces'] ?? 0;
		$formula        = $attributes['formula'] ?? '';
		$prefix         = $attributes['prefix'] ?? '';
		$suffix         = $attributes['postfix'] ?? '';
		$styling        = $attributes['styling'] ?? array(
			'fontSize' => 40,
		);

		$styling = array(
			'font-size' => $styling['fontSize'] . 'px',
		);

		$style = '';
		foreach ( $styling as $key => $value ) {
			$style .= $key . ':' . $value . ';';
		}
		ob_start();
		?>
		<div
			class="cwp-calculation cwp-field"
			data-condition="<?php echo esc_attr( ! empty( $condition ) ? wp_json_encode( $condition ) : '' ); ?>"
			data-cwp-calculation="<?php echo esc_attr( $formula ); ?>"
			data-deci="<?php echo esc_attr( $decimal_places ); ?>"
		>
			<div class="cwp-field-set">
				<?php echo $this->map_label( false, $label, '', $id ); ?>

				<div class="cwp-result-wrap">
					<?php if ( ! empty( $prefix ) ): ?>
						<span style="<?php echo esc_attr( $style ); ?>">
							<?php echo esc_html( $prefix ); ?>
						</span>
					<?php endif; ?>

					<span class="cwp-calc-result" style="<?php echo esc_attr( $style ); ?>">
						0
					</span>

					<?php if ( ! empty( $suffix ) ): ?>
						<span style="<?php echo esc_attr( $style ); ?>">
							<?php echo esc_html( $suffix ); ?>
						</span>
					<?php endif; ?>
				</div>

				<input
					name="<?php echo esc_attr( $id ); ?>"
					id="<?php echo esc_attr( $id ); ?>"
					type="hidden"
					data-rule="false"
					data-cwp-field
					placeholder=<?php echo esc_attr( $calculation ); ?>
				/>
			</div>
		</div>
		<?php
		return ob_get_clean();
	}
}
