mail_from.verp
========

This sets the plugin header using VERP mail_from.
With this, the incoming server sets the Return-Path header with
the same header value mail_from, without FROM header of data
content modifications.

The structure of the verp is:

Return-Path:          Message-Id                   -RJ-     rcpt_to         @  Haraka SMTP
Return-Path: A3B6DFB1-74E3-426A-B276-0E02056175DA.1-RJ-user=maildomain.com@harakaserver.com

This plugin must be set after the data.header plugin

Configuration
-------------

* `config/verp_domain.ini` - This file define the domain will be set in ther VERP mail_from
