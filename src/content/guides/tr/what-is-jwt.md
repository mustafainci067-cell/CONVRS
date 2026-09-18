---
title: "JSON Web Token (JWT) Nedir ve Nasıl Çalışır?"
description: "JSON Web Token'ları (JWT), yapıları ve modern web kimlik doğrulamasını nasıl güvence altına aldıklarını anlamak için başlangıç dostu bir rehber."
date: "2026-10-03"
---

## JWT'ye Giriş

Modern web uygulamalarında, kullanıcıların güvenli bir şekilde oturum açık tutulması zorlu bir iştir. JSON Web Token (JWT) burada devreye girer. Taraflar arasında bilgi güvenli bir şekilde iletmek için kompakt bir yol tanımlayan açık bir standarttır.

## JWT'nin Yapısı

Bir JWT uzun, rastgele bir dize gibi görünür ancak aslında üç bölümden oluşur: Başlık (Header), Yük (Payload) ve İmza (Signature). Noktalarla ayrılır: `xxxxx.yyyyy.zzzzz`.

## Başlık ve Yük

Başlık genellikle token türünü ve kullanılan algoritmayı içerir. Yük (Payload) ise beyanları (claims) içerir; kullanıcı kimliği, rolü ve token son kullanma süresi gibi ek veriler burada yer alır. Her ikisi de Base64Url ile kodlanır.

## İmza (Gizli Sos)

İmza bölümünü oluşturmak için, kodlanmış başlık, kodlanmış yük, bir sır (sadece sunucu tarafından bilinen şifre) ve algoritma kullanılır. İmza, verinin yolda değiştirilmediğini doğrulamak için kullanılır.

## Uyarı: Şifreli Değildir

JWT'ler hakkında kritik bir detay, Başlık ve Yük'ün şifrelenmemiş, sadece kodlanmış olmasıdır. Token'ı ele geçiren herkes içindeki verileri okuyabilir. Geliştirme sırasında tokenınızın içinde ne olduğunu incelemek için JWT Kod Çözücü aracımızı kullanabilirsiniz.

## Technical Considerations

## JWT'ye Giriş

Modern web uygulamalarında, kullanıcıların güvenli bir şekilde oturum açık tutulması zorlu bir iştir. JSON Web Token (JWT) burada devreye girer. Taraflar arasında bilgi güvenli bir şekilde iletmek için kompakt bir yol tanımlayan açık bir standarttır.

## JWT'nin Yapısı

Bir JWT uzun, rastgele bir dize gibi görünür ancak aslında üç bölümden oluşur: Başlık (Header), Yük (Payload) ve İmza (Signature). Noktalarla ayrılır: `xxxxx.yyyyy.zzzzz`.

## Başlık ve Yük

Başlık genellikle token türünü ve kullanılan algoritmayı içerir. Yük (Payload) ise beyanları (claims) içerir; kullanıcı kimliği, rolü ve token son kullanma süresi gibi ek veriler burada yer alır. Her ikisi de Base64Url ile kodlanır.

## İmza (Gizli Sos)

İmza bölümünü oluşturmak için, kodlanmış başlık, kodlanmış yük, bir sır (sadece sunucu tarafından bilinen şifre) ve algoritma kullanılır. İmza, verinin yolda değiştirilmediğini doğrulamak için kullanılır.



## Best Practices

## Başlık ve Yük

Başlık genellikle token türünü ve kullanılan algoritmayı içerir. Yük (Payload) ise beyanları (claims) içerir; kullanıcı kimliği, rolü ve token son kullanma süresi gibi ek veriler burada yer alır. Her ikisi de Base64Url ile kodlanır.

## İmza (Gizli Sos)

İmza bölümünü oluşturmak için, kodlanmış başlık, kodlanmış yük, bir sır (sadece sunucu tarafından bilinen şifre) ve algoritma kullanılır. İmza, verinin yolda değiştirilmediğini doğrulamak için kullanılır.

