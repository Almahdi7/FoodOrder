import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

export default function UiKitPreview() {
  return (
        <div className="container-page flex flex-col gap-8 py-10">
      <h1 className="page-title">UI Kit</h1>

      <section>
        <h2 className="section-title mb-3">Button</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Button>Primary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
          <Button size="sm">Small</Button>
          <Button size="lg">Large</Button>
          <Button loading>Loading</Button>
          <Button disabled>Disabled</Button>
        </div>
      </section>

      <section>
        <h2 className="section-title mb-3">Input</h2>
        <div className="grid max-w-md gap-4">
          <Input label="Email" type="email" placeholder="you@example.com" />
          <Input label="Password" type="password" error="Use at least 6 characters" />
          <Input label="Disabled" disabled defaultValue="Can't edit this" />
        </div>
      </section>
    </div>
  )
}