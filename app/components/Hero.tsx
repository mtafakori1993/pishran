import CircleMenu from "./CircleMenu";
import CosmicBackground from "./CosmicBackground";
import FadeIn from "./FadeIn";

export default function Hero() {
  return (
    <section className="relative min-h-0 overflow-visible px-3 pt-8 sm:px-4 sm:pt-10 lg:pt-14 pb-4">
      <CosmicBackground variant="hero" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center">
        <FadeIn className="w-full max-w-6xl text-center">
      
          <h1 className="text-display text-gradient mb-4 sm:mb-5 whitespace-nowrap">
            به ابر اپلیکیشن پیشران خوش آمدید
          </h1>
          <p className="text-body mx-auto max-w-6xl leading-relaxed">
            پیشران یک اپلیکیشن بی‌انتها مرتبط با خدمات اجتماعی و املاک و حمل‌ونقل
            هوشمند، صنعت ساختمان و صنایع غذایی و تبلیغات، پوشاک و آرایشی و زیبایی،
            الکترونیک و کامپیوتر، سرمایه‌گذاری و تولید و گردشگری، آموزش و پژوهش و
            سرگرمی است.
          </p>
          <p className="text-subtitle mx-auto mt-4 max-w-xl sm:mt-5 whitespace-nowrap">
            بر روی قسمت مورد نظر کلیک کنید و امکانات و خدمات را مشاهده بفرمایید.
          </p>
        </FadeIn>

        <FadeIn delay={150} className="flex w-full justify-center overflow-visible">
          <CircleMenu />
        </FadeIn>
      </div>
    </section>
  );
}
