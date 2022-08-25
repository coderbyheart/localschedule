import styles from 'app/FeatherIcons.module.css'
import { icons as featherIcons } from 'feather-icons'

type IconOptions = {
	/** defaults to 1.5 */
	strokeWidth?: number
	/** defaults to 'inherit' */
	color?: string
	/** defaults to 20 */
	size?: number
	title: string
	className?: string
}

const defaultIconSize = 24
const defaultStrokeWidth = 2

// Must be wrapped in an element: https://github.com/reactjs/rfcs/pull/129
const wrapSvg = (options: IconOptions) => (f: typeof featherIcons[0]) =>
	(
		<span
			className={`${options.className ?? ''} ${
				styles.iconContainer
			} feather-icon`}
			style={{
				height: `${options.size ?? defaultIconSize}px`,
				width: `${options.size ?? defaultIconSize}px`,
				color: `${options.color ?? 'inherit'}`,
			}}
			aria-label={options.title}
			dangerouslySetInnerHTML={{
				__html: f.toSvg({
					'stroke-width': `${options.strokeWidth ?? defaultStrokeWidth}px`,
					width: `${options.size ?? defaultIconSize}px`,
					height: `${options.size ?? defaultIconSize}px`,
				}),
			}}
		/>
	)

type FeatherIconIdentifier =
	| 'activity'
	| 'airplay'
	| 'alert-circle'
	| 'alert-octagon'
	| 'alert-triangle'
	| 'align-center'
	| 'align-justify'
	| 'align-left'
	| 'align-right'
	| 'anchor'
	| 'aperture'
	| 'archive'
	| 'arrow-down-circle'
	| 'arrow-down-left'
	| 'arrow-down-right'
	| 'arrow-down'
	| 'arrow-left-circle'
	| 'arrow-left'
	| 'arrow-right-circle'
	| 'arrow-right'
	| 'arrow-up-circle'
	| 'arrow-up-left'
	| 'arrow-up-right'
	| 'arrow-up'
	| 'at-sign'
	| 'award'
	| 'bar-chart-2'
	| 'bar-chart'
	| 'battery-charging'
	| 'battery'
	| 'bell-off'
	| 'bell'
	| 'bluetooth'
	| 'bold'
	| 'bookmark'
	| 'book-open'
	| 'book'
	| 'box'
	| 'briefcase'
	| 'calendar'
	| 'camera-off'
	| 'camera'
	| 'cast'
	| 'check-circle'
	| 'check-square'
	| 'check'
	| 'chevron-down'
	| 'chevron-left'
	| 'chevron-right'
	| 'chevrons-down'
	| 'chevrons-left'
	| 'chevrons-right'
	| 'chevrons-up'
	| 'chevron-up'
	| 'chrome'
	| 'circle'
	| 'clipboard'
	| 'clock'
	| 'cloud-drizzle'
	| 'cloud-lightning'
	| 'cloud-off'
	| 'cloud-rain'
	| 'cloud-snow'
	| 'cloud'
	| 'codepen'
	| 'codesandbox'
	| 'code'
	| 'coffee'
	| 'columns'
	| 'command'
	| 'compass'
	| 'copy'
	| 'corner-down-left'
	| 'corner-down-right'
	| 'corner-left-down'
	| 'corner-left-up'
	| 'corner-right-down'
	| 'corner-right-up'
	| 'corner-up-left'
	| 'corner-up-right'
	| 'cpu'
	| 'credit-card'
	| 'crop'
	| 'crosshair'
	| 'database'
	| 'delete'
	| 'disc'
	| 'divide-circle'
	| 'divide-square'
	| 'divide'
	| 'dollar-sign'
	| 'download-cloud'
	| 'download'
	| 'dribbble'
	| 'droplet'
	| 'edit-2'
	| 'edit-3'
	| 'edit'
	| 'external-link'
	| 'eye-off'
	| 'eye'
	| 'facebook'
	| 'fast-forward'
	| 'feather'
	| 'figma'
	| 'file-minus'
	| 'file-plus'
	| 'file'
	| 'file-text'
	| 'film'
	| 'filter'
	| 'flag'
	| 'folder-minus'
	| 'folder-plus'
	| 'folder'
	| 'framer'
	| 'frown'
	| 'gift'
	| 'git-branch'
	| 'git-commit'
	| 'github'
	| 'gitlab'
	| 'git-merge'
	| 'git-pull-request'
	| 'globe'
	| 'grid'
	| 'hard-drive'
	| 'hash'
	| 'headphones'
	| 'heart'
	| 'help-circle'
	| 'hexagon'
	| 'home'
	| 'image'
	| 'inbox'
	| 'info'
	| 'instagram'
	| 'italic'
	| 'key'
	| 'layers'
	| 'layout'
	| 'life-buoy'
	| 'link-2'
	| 'linkedin'
	| 'link'
	| 'list'
	| 'loader'
	| 'lock'
	| 'log-in'
	| 'log-out'
	| 'mail'
	| 'map-pin'
	| 'map'
	| 'maximize-2'
	| 'maximize'
	| 'meh'
	| 'menu'
	| 'message-circle'
	| 'message-square'
	| 'mic-off'
	| 'mic'
	| 'minimize-2'
	| 'minimize'
	| 'minus-circle'
	| 'minus-square'
	| 'minus'
	| 'monitor'
	| 'moon'
	| 'more-horizontal'
	| 'more-vertical'
	| 'mouse-pointer'
	| 'move'
	| 'music'
	| 'navigation-2'
	| 'navigation'
	| 'octagon'
	| 'package'
	| 'paperclip'
	| 'pause-circle'
	| 'pause'
	| 'pen-tool'
	| 'percent'
	| 'phone-call'
	| 'phone-forwarded'
	| 'phone-incoming'
	| 'phone-missed'
	| 'phone-off'
	| 'phone-outgoing'
	| 'phone'
	| 'pie-chart'
	| 'play-circle'
	| 'play'
	| 'plus-circle'
	| 'plus-square'
	| 'plus'
	| 'pocket'
	| 'power'
	| 'printer'
	| 'radio'
	| 'refresh-ccw'
	| 'refresh-cw'
	| 'repeat'
	| 'rewind'
	| 'rotate-ccw'
	| 'rotate-cw'
	| 'rss'
	| 'save'
	| 'scissors'
	| 'search'
	| 'send'
	| 'server'
	| 'settings'
	| 'share-2'
	| 'share'
	| 'shield-off'
	| 'shield'
	| 'shopping-bag'
	| 'shopping-cart'
	| 'shuffle'
	| 'sidebar'
	| 'skip-back'
	| 'skip-forward'
	| 'slack'
	| 'slash'
	| 'sliders'
	| 'smartphone'
	| 'smile'
	| 'speaker'
	| 'square'
	| 'star'
	| 'stop-circle'
	| 'sunrise'
	| 'sunset'
	| 'sun'
	| 'tablet'
	| 'tag'
	| 'target'
	| 'terminal'
	| 'thermometer'
	| 'thumbs-down'
	| 'thumbs-up'
	| 'toggle-left'
	| 'toggle-right'
	| 'tool'
	| 'trash-2'
	| 'trash'
	| 'trello'
	| 'trending-down'
	| 'trending-up'
	| 'triangle'
	| 'truck'
	| 'tv'
	| 'twitch'
	| 'twitter'
	| 'type'
	| 'umbrella'
	| 'underline'
	| 'unlock'
	| 'upload-cloud'
	| 'upload'
	| 'user-check'
	| 'user-minus'
	| 'user-plus'
	| 'users'
	| 'user'
	| 'user-x'
	| 'video-off'
	| 'video'
	| 'voicemail'
	| 'volume-1'
	| 'volume-2'
	| 'volume'
	| 'volume-x'
	| 'watch'
	| 'wifi-off'
	| 'wifi'
	| 'wind'
	| 'x-circle'
	| 'x-octagon'
	| 'x-square'
	| 'x'
	| 'youtube'
	| 'zap-off'
	| 'zap'
	| 'zoom-in'
	| 'zoom-out'

export const FeatherIcon = ({
	type,
	...options
}: { type: FeatherIconIdentifier } & IconOptions) =>
	wrapSvg(options)(featherIcons[type])

type TypedIconOptions = Omit<IconOptions, 'title'>

export const EyeIcon = (options?: TypedIconOptions) => (
	<FeatherIcon {...options} type="eye" title="Show" />
)
export const EyeOffIcon = (options?: TypedIconOptions) => (
	<FeatherIcon {...options} type="eye-off" title="Hide" />
)
export const LockIcon = (options?: TypedIconOptions) => (
	<FeatherIcon {...options} type="lock" title="Lock" />
)
export const UnLockIcon = (options?: TypedIconOptions) => (
	<FeatherIcon {...options} type="unlock" title="Unlock" />
)

export const AddIcon = (options?: TypedIconOptions) => (
	<FeatherIcon {...options} type="plus-circle" title="Add" />
)
export const DeleteIcon = (options?: TypedIconOptions) => (
	<FeatherIcon {...options} type="minus-circle" title="Delete" />
)

export const DarkModeIcon = (options?: TypedIconOptions) => (
	<FeatherIcon {...options} type="moon" title="Dark mode" />
)
export const LightModeIcon = (options?: TypedIconOptions) => (
	<FeatherIcon {...options} type="sun" title="Light mode" />
)
export const GithubIcon = (options?: TypedIconOptions) => (
	<FeatherIcon {...options} type="github" title="GitHub" />
)

export const CalendarIcon = (options?: TypedIconOptions) => (
	<FeatherIcon {...options} type="calendar" title="Export as calendar (.ics)" />
)

export const StarIcon = (options?: TypedIconOptions) => (
	<FeatherIcon {...options} type="star" title="⭐" />
)
