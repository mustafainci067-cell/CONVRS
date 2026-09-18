---
title: "Duyarlı Web Tasarımında REM ve EM Kullanmanın Faydaları"
description: "Yazı tipi boyutları ve boşluklar için piksel kullanmayı neden bırakmalı ve daha iyi erişilebilirlik ve duyarlılık için REM ve EM gibi göreceli birimlere geçmelisiniz."
date: "2026-09-29"
---

## Piksellerle İlgili Sorun

Uzun zamandır web geliştiricileri boyutlandırma için piksel (px) kullandı. Pikseller kesin kontrol sunsa da büyük bir kusurları vardır: mutlak birimlerdir. Görme engelli bir kullanıcı tarayıcı varsayılan boyutunu büyütse bile, 14px olarak sabitlenmiş metinler 14px kalır ve okunamayabilir.

## REM Nedir?

REM, 'Root EM' anlamına gelir. Kök elemanın (`<html>` etiketi) yazı tipi boyutuna dayanan göreceli bir birimdir. Tarayıcıların varsayılan kök boyutu genelde 16px'tir. Yani `1rem` 16px'e eşittir. Kullanıcı tarayıcı boyutunu değiştirirse tüm siteniz orantılı olarak ölçeklenir.

## EM Nedir?

EM de göreceli bir birimdir ancak kök elemana değil, doğrudan ebeveyn elemanının yazı tipi boyutuna bağlıdır. EM, padding ve margin'lerin butonun yazı tipine göre ölçeklenmesini istediğiniz butonlar gibi modüler bileşenler için harikadır.

## Hangisi Ne Zaman Kullanılmalı?

Küresel tipografi ve düzen boşlukları için REM kullanmak en iyi uygulamadır. Öğelerin doğrudan bağlamlarına göre orantılı ölçeklenmesi gereken bileşen düzeyindeki boyutlandırmalar için EM kullanın.

## px'i rem'e Dönüştürmek

Kafadan hesaplamak sıkıcı olabilir. Zaman kazanmak için piksel değerlerini saniyeler içinde göreceli birim karşılıklarına çeviren ücretsiz PX - REM Dönüştürücü aracımızı kullanabilirsiniz.

## Technical Considerations

## Piksellerle İlgili Sorun

Uzun zamandır web geliştiricileri boyutlandırma için piksel (px) kullandı. Pikseller kesin kontrol sunsa da büyük bir kusurları vardır: mutlak birimlerdir. Görme engelli bir kullanıcı tarayıcı varsayılan boyutunu büyütse bile, 14px olarak sabitlenmiş metinler 14px kalır ve okunamayabilir.

## REM Nedir?

REM, 'Root EM' anlamına gelir. Kök elemanın (`<html>` etiketi) yazı tipi boyutuna dayanan göreceli bir birimdir. Tarayıcıların varsayılan kök boyutu genelde 16px'tir. Yani `1rem` 16px'e eşittir. Kullanıcı tarayıcı boyutunu değiştirirse tüm siteniz orantılı olarak ölçeklenir.

## EM Nedir?

EM de göreceli bir birimdir ancak kök elemana değil, doğrudan ebeveyn elemanının yazı tipi boyutuna bağlıdır. EM, padding ve margin'lerin butonun yazı tipine göre ölçeklenmesini istediğiniz butonlar gibi modüler bileşenler için harikadır.

## Hangisi Ne Zaman Kullanılmalı?

Küresel tipografi ve düzen boşlukları için REM kullanmak en iyi uygulamadır. Öğelerin doğrudan bağlamlarına göre orantılı ölçeklenmesi gereken bileşen düzeyindeki boyutlandırmalar için EM kullanın.



## Best Practices

## EM Nedir?

EM de göreceli bir birimdir ancak kök elemana değil, doğrudan ebeveyn elemanının yazı tipi boyutuna bağlıdır. EM, padding ve margin'lerin butonun yazı tipine göre ölçeklenmesini istediğiniz butonlar gibi modüler bileşenler için harikadır.

## Hangisi Ne Zaman Kullanılmalı?

Küresel tipografi ve düzen boşlukları için REM kullanmak en iyi uygulamadır. Öğelerin doğrudan bağlamlarına göre orantılı ölçeklenmesi gereken bileşen düzeyindeki boyutlandırmalar için EM kullanın.

