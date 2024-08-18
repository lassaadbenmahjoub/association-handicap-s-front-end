<script setup>
import { ref } from 'vue'

const associationInfo = ref({
  quiSommesNous: `صفاقس الخيرية جمعية خيرية تنموية تأسست في 7 جوان 2011 باسم "جمعية الرحمة الخيرية" ثم غيرت اسمها في 15 جوان  2014 وتعمل في ترسيخ مبادئ التكافل الاجتماعي في إطار خيري يسمو بنا كأفراد و مجتمعات.
صفاقس الخيرية هي إحدى الجمعيات الخيرية في تونس.`,
  notreVision: `نتطلّع إلى أن نكون مؤسسة خيرية رائدة ومتميّزة في خدمة الإنسان والمجتمع.`,
  notreMessage: `تعمل صفاقس الخيرية على دعم المحتاجين وفاقدي السند وضحايا الكوارث والأزمات في كل المجالات الممكنة بهدف بناء حياة كريمة أساسها الاكتفاء والاعتماد على النفس. كما تعمل على المساهمة في تحسين بيئة العمل الخيري في تونس واستثمار قيم التكافل والبرّ والاحسان في الارتقاء بالإنسان وتنمية المجتمع.`,
  nosObjectifs: `العمل على رفع وتعزيز قدرات الجمعية في تونس.
تقديم العون للفقراء والمحتاجين والعمل على تحسين أوضاعهم.
تقديم الخدمات الإنسانية وأعمال الإغاثة لضحايا الكوارث والأزمات.
دعم العمل الخيري التطوعي والمساهمة في تحقيق التكافل الاجتماعي.
قبول أموال الزكاة و توظيفها في مصارفها الشرعية.`,
  valeursDirectrices: `الإستقلالية ...الشفافية...التعاون ...التميز...التجدد...`
})
</script>

<template>
  <div class="visiteur-page pa-4" dir="rtl">
    <h1 class="mb-4">التعريف بالجمعية</h1>

    <section class="mb-4">
      <h2>من نحن</h2>
      <p>{{ associationInfo.quiSommesNous }}</p>
    </section>

    <section class="mb-4">
      <h2>رؤيتنا</h2>
      <p>{{ associationInfo.notreVision }}</p>
    </section>

    <section class="mb-4">
      <h2>رسالتنا</h2>
      <p>{{ associationInfo.notreMessage }}</p>
    </section>

    <section class="mb-4">
      <h2>أهدافنا</h2>
      <p>{{ associationInfo.nosObjectifs }}</p>
    </section>

    <section class="mb-4">
      <h2>القيم الموجهة</h2>
      <p>{{ associationInfo.valeursDirectrices }}</p>
    </section>
  </div>
</template>

<style scoped>
.visiteur-page {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  text-align: right; /* Align text to the right */
}

.visiteur-page h1,
.visiteur-page h2,
.visiteur-page p {
  text-align: right; /* Ensure text alignment is right for RTL */
}

.visiteur-page h1 {
  font-size: 2rem;
  color: #333;
}

.visiteur-page h2 {
  font-size: 1.5rem;
  color: #555;
}

.visiteur-page p {
  font-size: 1rem;
  color: #666;
  line-height: 1.5;
}
</style>
